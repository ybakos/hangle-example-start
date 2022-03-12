namespace SpriteKind {
    export const HangPerson = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    guess = game.askForString("pick a letter", 1)
    if (mystery_word.includes(guess)) {
        guessed_word = update_guessed_word(guess, guessed_word, mystery_word)
        display_guessed_word(guessed_word)
    } else {
        number_of_wrong_guesses += 1
        draw_hang_person(number_of_wrong_guesses)
    }
})
function handle_game_over (number_of_wrong_guesses: number) {
    if (number_of_wrong_guesses >= 2) {
        game.over(false, effects.splatter)
    }
}
function construct_guessed_word (word: string) {
    constructed_guessed_word = ""
    for (let index = 0; index < word.length; index++) {
        constructed_guessed_word = "" + constructed_guessed_word + "_"
    }
    return constructed_guessed_word
}
function draw_body () {
    bodySprite = sprites.create(assets.image`body`, SpriteKind.HangPerson)
    bodySprite.setPosition(30, 40)
}
function update_guessed_word (guess: string, guessed_word: string, mystery_word: string) {
    previously_guessed_word = guessed_word
    guessed_word = ""
    for (let index = 0; index <= mystery_word.length - 1; index++) {
        if (mystery_word.charAt(index).includes(guess)) {
            guessed_word = "" + guessed_word + guess
        } else {
            guessed_word = "" + guessed_word + previously_guessed_word.charAt(index)
        }
    }
    return guessed_word
}
function draw_head () {
    headSprite = sprites.create(assets.image`head`, SpriteKind.HangPerson)
    headSprite.setPosition(30, 30)
}
function display_guessed_word (word: string) {
    x_position = 20
    for (let index = 0; index <= word.length - 1; index++) {
        textSprite = textsprite.create(word.charAt(index), 0, 1)
        textSprite.setPosition(x_position, 105)
        x_position += 10
    }
}
function draw_hang_person (number_of_parts: number) {
    if (number_of_parts == 1) {
        draw_head()
    }
    if (number_of_parts == 2) {
        draw_body()
    }
}
let textSprite: TextSprite = null
let x_position = 0
let headSprite: Sprite = null
let previously_guessed_word = ""
let bodySprite: Sprite = null
let constructed_guessed_word = ""
let guess = ""
let number_of_wrong_guesses = 0
let guessed_word = ""
let mystery_word = ""
let word_bank = ["ace", "cherry", "gargantuan"]
mystery_word = word_bank._pickRandom()
guessed_word = construct_guessed_word(mystery_word)
display_guessed_word(guessed_word)
number_of_wrong_guesses = 0
forever(function () {
    handle_game_over(number_of_wrong_guesses)
})
