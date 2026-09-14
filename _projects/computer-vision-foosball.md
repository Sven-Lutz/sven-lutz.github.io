---
title: "Computer Vision for a Foosball Table"
short_title: "Computer-Vision Foosball"
slug: computer-vision-foosball
description: "A team-built, deliberately playful computer-vision system for detecting goals and turning a physical foosball match into live statistics."
type: Team project
status: Prototype completed
period: 2024
role: Collaborative software development
stack:
  - OpenCV
  - Python
  - Computer vision
  - Testing
repository: https://github.com/Sven-Lutz/EDV4_Tischkicker
repository_public: true
featured: false
order: 5
---

## The idea

A foosball table is a useful computer-vision laboratory: motion is fast, the scene is constrained and the output—whether a goal occurred—is immediately understandable.

The team project used OpenCV to observe play, detect goals and derive match statistics. It was designed as a playful application, but it required the same practical work as more serious prototypes: calibration, image preprocessing, event detection and handling imperfect observations.

## Engineering scope

The repository combines the detection pipeline with application logic, tests and team documentation. The interesting challenge is not displaying a score; it is turning a noisy video stream into discrete, dependable events without making the system too fragile for actual play.

## Why it stays in the portfolio

This is intentionally not framed as research or a finished product. It is a compact example of collaborative engineering, computer vision and the pleasure of building something that connects software to a physical setting.
