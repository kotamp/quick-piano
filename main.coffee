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
###

loadSounds = (urls, cb) ->
  count = urls.length
  j = 0
  result = []
  for url in urls
    result.push new Pizzicato.Sound url, ->
      j++
      if j == count then cb result

ll = [
  'Casio-VZ-10M-Piano-C2.wav',
  'piano-f-c4.wav',
  'piano-p-c4-PA.wav'
].map (e) -> './audio/' + e

group = ''



start = 0

toNote = (index) ->
  octave = Math.floor index / 12
  note = index % 12

  result = do -> switch note
    when 0
      return 'c'
    when 1
      return 'c#'
    when 2
      return 'd'
    when 3
      return 'd#'
    when 4
      return 'e'
    when 5
      return 'f'
    when 6
      return 'f#'
    when 7
      return 'g'
    when 8
      return 'g#'
    when 9
      return 'a'
    when 10
      return 'a#'
    else
      return 'b'

  return result + octave


rowCount = 7
columnCount = 6
beginFrom = 36
base = 27.5
buttonElems = []

$ = (id) -> document.getElementById id

prepareButtons = ->
  pads = $ 'pads'
  beginFrom = beginFrom

  for i in [1..rowCount]
    r = document.createElement 'div'
    r.className = 'row'
    for j in [1..columnCount]
      b = document.createElement 'button'
      note = toNote beginFrom++
      color = if note.indexOf('#') == -1 then 'white' else 'black'
      b.className = "button " + color
      b.innerText = note
      buttonElems.push b
      r.appendChild b
    pads.appendChild r

handleButtons = ->
  beginFrom = beginFrom
  for b in buttonsElems
    b.addEventListener 'click', ((index) ->
      sound = group.clone()
      sound.frequency = 
      (e) ->
        
      ), beginFrom++


window.addEventListener "load", ->
  
  loadSounds ll, (sounds) ->
    group = new Pizzicato.Group sounds, (err) ->
      if (err) then throw err
      do prepareButtons
      do handleButtons