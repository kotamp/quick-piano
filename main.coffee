###
new Pizzicato.Sound
  source: 'wave',
  options:
    frequency: 440
.play

ss = new Pizzicato.Sound './source.mp3', cb ->
  ss.play()

sound = new Pizzicato.Sound (e) ->
  output = e.outputBuffer.getChannelData(0)
  for i in [0...e.outputBuffer.length]
    output[i] = asdf

group = new Pizzicato.Group([drums, guitar]);
group.addSound bass
group.addEffect reverb
group.play