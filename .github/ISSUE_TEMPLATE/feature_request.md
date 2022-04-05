name: Feature Request
description: Propose a new feature for Anchor
title: "[featurerequest]: "
labels: ["anchor", "enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        We appreciate you taking the time create a feature request for Anchor!  We will reach out if need be.
  - type: input
    id: contact
    attributes:
      label: Contact Details
      description: How can we get in touch with you if we need more info?
      placeholder: ex. email@example.com
    validations:
      required: false
  - type: dropdown
    id: version
    attributes:
      label: Platform
      description: What platform of Anchor is this intended for?
      options:
        - Desktop (MacOS)
        - Desktop (Windows)
        - Desktop (Linux)
        - iOS
        - Android
        - All
    validations:
      required: true
  - type: textarea
    id: description
    attributes:
      label: Description
      description: Please describe the change you'd like to see in Anchor
      placeholder: Tell us whats you'd like to see
      value: ""
    validations:
      required: true
  - type: textarea
    id: description
    attributes:
      label: Alternatives/Workarounds
      description: What workarounds or alternatives have you used/considered?
      value: ""
    validations:
      required: true       
  - type: textarea
    id: screenshots
    attributes:
      label: Relevant screenshots or designs
      description: Please add any screenshots or designs that would assist in explaining your feature request
      render: shell
