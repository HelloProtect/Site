let tracks = [];
const container = document.getElementById("tracksContainer");
const addTrackBtn = document.getElementById("addTrackBtn");
const exportBtn = document.getElementById("exportBtn");
const audioInput = document.getElementById("audioFile");

// Crée une nouvelle piste
function createTrack(file) {
  const trackDiv = document.createElement("div");
  trackDiv.classList.add("track");

  const wsDiv = document.createElement("div");
  trackDiv.appendChild(wsDiv);

  const playBtn = document.createElement("button");
  playBtn.textContent = "Play / Pause";
  trackDiv.appendChild(playBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Supprimer";
  trackDiv.appendChild(deleteBtn);

  container.appendChild(trackDiv);

  const wavesurfer = WaveSurfer.create({
    container: wsDiv,
    waveColor: "#97c1a9",
    progressColor: "#3b7a57",
    cursorColor: "#ff0000",
    height: 100,
  });

  wavesurfer.load(URL.createObjectURL(file));

  playBtn.onclick = () => wavesurfer.playPause();
  deleteBtn.onclick = () => {
    wavesurfer.destroy();
    trackDiv.remove();
    tracks = tracks.filter(t => t !== wavesurfer);
  };

  tracks.push(wavesurfer);
}

// Ajouter une piste via fichier
audioInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) createTrack(file);
});

// Ajouter une piste vide
addTrackBtn.addEventListener("click", () => {
  const emptyFile = new Blob([], { type: "audio/wav" });
  createTrack(emptyFile);
});

// Exporter toutes les pistes en un seul WAV
exportBtn.addEventListener("click", async () => {
  if (tracks.length === 0) return alert("Pas de piste à exporter");

  // Créer un contexte audio
  const audioCtx = new AudioContext();
  const dest = audioCtx.createChannelMerger(tracks.length);
  const buffers = [];

  for (let i = 0; i < tracks.length; i++) {
    const wavesurfer = tracks[i];
    const arrayBuffer = await fetch(wavesurfer.backend.bufferUrl).then(r => r.arrayBuffer());
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    buffers.push(audioBuffer);
  }

  // Calculer la durée max
  const maxLength = Math.max(...buffers.map(b => b.length));
  const sampleRate = audioCtx.sampleRate;
  const output = audioCtx.createBuffer(2, maxLength, sampleRate);

  buffers.forEach(buffer => {
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const outputData = output.getChannelData(channel);
      const inputData = buffer.getChannelData(channel);
      for (let i = 0; i < inputData.length; i++) {
        outputData[i] += inputData[i];
      }
    }
  });

  // Exporter en WAV
  const wavBlob = bufferToWave(output);
  const url = URL.createObjectURL(wavBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mix.wav";
  a.click();
});

// Conversion AudioBuffer -> WAV
function bufferToWave(abuffer) {
  const numOfChan = abuffer.numberOfChannels,
        length = abuffer.length * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [],
        sampleRate = abuffer.sampleRate;

  let offset = 0;

  function writeString(view, offset, string){
    for (let i = 0; i < string.length; i++){
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF chunk descriptor
  writeString(view, offset, 'RIFF'); offset += 4;
  view.setUint32(offset, length - 8, true); offset += 4;
  writeString(view, offset, 'WAVE'); offset += 4;
  writeString(view, offset, 'fmt '); offset += 4;
  view.setUint32(offset, 16, true); offset += 4;
  view.setUint16(offset, 1, true); offset += 2;
  view.setUint16(offset, numOfChan, true); offset += 2;
  view.setUint32(offset, sampleRate, true); offset += 4;
  view.setUint32(offset, sampleRate * 2 * numOfChan, true); offset += 4;
  view.setUint16(offset, numOfChan * 2, true); offset += 2;
  view.setUint16(offset, 16, true); offset += 2;
  writeString(view, offset, 'data'); offset += 4;
  view.setUint32(offset, length - offset - 4, true); offset += 4;

  // écrire les données
  for(let i = 0; i < abuffer.length; i++){
    for(let ch = 0; ch < numOfChan; ch++){
      let sample = abuffer.getChannelData(ch)[i];
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: "audio/wav" });
}
