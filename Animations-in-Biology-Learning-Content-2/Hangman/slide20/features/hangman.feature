# /features/hangman.feature
# This feature file is designed to interact with the base original design of the hangman app (including the original sentences and functionality). 
# Any changes to the hangman app will result in failing scenarios here. 

Feature: Play Hangman in real time
    As a student,
    So that I can track the correctness of each letter guessed,
    I want the hangman figure and word to update accurately in real time. 

    Scenario: Guess correct letters
        Given I am playing hangman
        When I guess the following letters
            | a |
            | n |
            | r |
            | m |
        Then I should see status "Wrong Guesses: 0 of 8"
        And I should see blanks turn into letters I guessed
        And I should see hangman image "wrong0.png"
        

    Scenario: Guess incorrect letter
        Given I am playing hangman
        When I guess the following letters
            | z |
            | b |
            | k | 
            | q |
        Then I should see status "Wrong Guesses: 4 of 8"
        And I should see hangman image "wrong4.png"

    Scenario: Pick letter already guessed
        Given I am playing hangman
        And I have already guessed the following letters
            | a |
            | q | 
            | m | 
            | l |
        When I guess the letter "l"
        Then I should see hangman image "wrong2.png"
        # a, m are correct (see above); l, q are incorrect (see above)

    Scenario: Lose the game
        Given I am playing hangman
        When I guess too many incorrect letters
        Then I should see hangman image "lose.png"
        And I should see status "You lose. Click Reset to try again!"
        And I should see the reset button

    Scenario: Win the game
        Given I am playing hangman
        When I guess all the correct letters
        Then I should see hangman image "win.png"
        Then I should see status "You win! Hope you enjoyed playing."
        And I should see the reset button
    
    Scenario: Reset the game
        Given I am playing hangman
        When I guess all the correct letters
        And I click the reset button
        Then I should see hangman image "wrong0.png"
        And I should see status "Wrong Guesses: 0 of 8"
        And I should not see the reset button
