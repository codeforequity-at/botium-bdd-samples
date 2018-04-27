Feature: User feedback
  Getting feedback from the user after calculation

  Scenario: User confirms correctnes
    When bot does a calculation
	And bot asks for feedback
	And user accepts result
    Then bot should accept

  Scenario: Bot shows self confidence
    When bot does a calculation
	And bot asks for feedback
	And user declines result
    Then bot should insist
