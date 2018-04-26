Feature: Basic calculations
  The most basic feature of a calculator

  Scenario: 1 and 1 should result in 2
    Given first number is 1
	And second number is 1
    When I ask to add the numbers
    Then the result should be 2

  Scenario: 1 and 2 should result in 3
    Given first number is 1
	And second number is 2
    When I ask to add the numbers
    Then the result should be 3