Feature: Basic calculations
  The most basic feature of a calculator

  Scenario Outline: Adding two simple numbers
    Given first number is <first>
	And second number is <second>
    When I ask to add the numbers
    Then the result should be <result>

    Examples:
	  | first | second | result |
	  | 1     | 2      | 3      |
	  | 10    | 20     | 30     |
	  | 25    | 100    | 125    |
