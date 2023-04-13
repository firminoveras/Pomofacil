$("#ambience-forest").click(() => ambienceSoundSelect('ambience-forest'))
$("#ambience-night").click(() => ambienceSoundSelect('ambience-night'))
$("#ambience-rain").click(() => ambienceSoundSelect('ambience-rain'))
$("#ambience-coffe").click(() => ambienceSoundSelect('ambience-coffe'))
$("#ambience-ocean").click(() => ambienceSoundSelect('ambience-ocean'))

function ambienceSoundSelect(sound) {
    buttons = $('.ambience-button')
    selectedButton = $('#' + sound)
    $('#background-img').addClass('changed')

    $('#ambienceAudio').get(0).pause();

    if (selectedButton.hasClass('selected')) {
        selectedButton.removeClass('selected')
    } else {
        for (let i = 0; i < buttons.length; i++)
            buttons[i].classList.remove('selected')

        selectedButton.addClass('selected')
        $('#ambienceAudio').attr('src', './src/audio/' + sound + '.mp3')
        $('#ambienceAudio').get(0).load();
        $('#ambienceAudio').get(0).play();

        window.setTimeout(function () {
            $('#background-img').attr('src', './src/img/' + sound + '.jpg')
            $('#background-img').removeClass('changed')
        }, 500);
    }
}