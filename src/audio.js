const _audioContext = {
  context: null
}

export function getAudioContext() {
  if (_audioContext.context !== null) {
    return _audioContext.context
  }
  const AudioContext = window.AudioContext || window.webkitAudioContext
  _audioContext.context = new AudioContext()
  return _audioContext.context
}

export function initAudioContext() {
  const gainNode = _audioContext.context.createGain()
  gainNode.gain.value = 1
  console.log('unlocking')
  // create empty buffer and play it
  const buffer = _audioContext.context.createBuffer(1, 1, 22050)
  const source = _audioContext.context.createBufferSource()
  source.buffer = buffer
  source.connect(_audioContext.context.destination)
  // play the file. noteOn is the older version of start()
  source.start ? source.start(0) : source.noteOn(0)

  // by checking the play state after some time, we know if we're really unlocked
  setTimeout(function() {
    if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
      //
    }
  }, 0)
}

export function playAudioContext(audioBuffer) {
  const source = _audioContext.context.createBufferSource()
  source.buffer = audioBuffer
  source.connect(_audioContext.context.destination)
  source.start()
}
