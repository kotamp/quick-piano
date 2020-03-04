(function() {
  /*
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
  */
  var $, base, beginFrom, buttonElems, columnCount, group, handleButtons, ll, loadSounds, prepareButtons, rowCount, start, toNote;

  loadSounds = function(urls, cb) {
    var count, j, k, len, result, results, url;
    count = urls.length;
    j = 0;
    result = [];
    results = [];
    for (k = 0, len = urls.length; k < len; k++) {
      url = urls[k];
      results.push(result.push(new Pizzicato.Sound(url, function() {
        j++;
        if (j === count) {
          return cb(result);
        }
      })));
    }
    return results;
  };

  ll = ['Casio-VZ-10M-Piano-C2.wav', 'piano-f-c4.wav', 'piano-p-c4-PA.wav'].map(function(e) {
    return './audio/' + e;
  });

  group = '';

  start = 0;

  toNote = function(index) {
    var note, octave, result;
    octave = Math.floor(index / 12);
    note = index % 12;
    result = (function() {
      switch (note) {
        case 0:
          return 'c';
        case 1:
          return 'c#';
        case 2:
          return 'd';
        case 3:
          return 'd#';
        case 4:
          return 'e';
        case 5:
          return 'f';
        case 6:
          return 'f#';
        case 7:
          return 'g';
        case 8:
          return 'g#';
        case 9:
          return 'a';
        case 10:
          return 'a#';
        default:
          return 'b';
      }
    })();
    return result + octave;
  };

  rowCount = 7;

  columnCount = 6;

  beginFrom = 36;

  base = 27.5;

  buttonElems = [];

  $ = function(id) {
    return document.getElementById(id);
  };

  prepareButtons = function() {
    var b, color, i, j, k, l, note, pads, r, ref, ref1, results;
    pads = $('pads');
    beginFrom = beginFrom;
    results = [];
    for (i = k = 1, ref = rowCount; (1 <= ref ? k <= ref : k >= ref); i = 1 <= ref ? ++k : --k) {
      r = document.createElement('div');
      r.className = 'row';
      for (j = l = 1, ref1 = columnCount; (1 <= ref1 ? l <= ref1 : l >= ref1); j = 1 <= ref1 ? ++l : --l) {
        b = document.createElement('button');
        note = toNote(beginFrom++);
        color = note.indexOf('#') === -1 ? 'white' : 'black';
        b.className = "button " + color;
        b.innerText = note;
        buttonElems.push(b);
        r.appendChild(b);
      }
      results.push(pads.appendChild(r));
    }
    return results;
  };

  handleButtons = function() {
    var b, k, len, results;
    beginFrom = beginFrom;
    results = [];
    for (k = 0, len = buttonsElems.length; k < len; k++) {
      b = buttonsElems[k];
      results.push(b.addEventListener('click', (function(index) {
        var sound;
        sound = group.clone();
        return sound.frequency = function(e) {};
      }), beginFrom++));
    }
    return results;
  };

  window.addEventListener("load", function() {
    return loadSounds(ll, function(sounds) {
      return group = new Pizzicato.Group(sounds, function(err) {
        if (err) {
          throw err;
        }
        prepareButtons();
        return handleButtons();
      });
    });
  });

}).call(this);
