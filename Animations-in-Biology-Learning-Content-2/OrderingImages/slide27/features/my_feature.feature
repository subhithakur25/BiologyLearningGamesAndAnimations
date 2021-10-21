Feature: Retain existing image order
    In order to learn the nerve pathway that causes one to lift their foot after stepping on a sharp rock
    As a student
    I want to be able to re-order the images and receive feedback based on correctness of the order

    Scenario: Images ordering DOES correctly represent nerve pathway that causes foot lifting
        When Images are placed in "correct" order
        Then I should see "Correct Ordering! Good Job!"

    Scenario: Images ordering does NOT correctly represent nerve pathway that causes foot lifting
        When Images are placed in "incorrect" order
        Then I should see "Incorrect Ordering!"
