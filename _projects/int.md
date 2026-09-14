---
title: "Experimental Process-Control Software"
short_title: "INT: Experimental Process Control"
slug: int
description: "A modular Python application for controlling laboratory filtration and Aqua systems, connecting hardware, experiment workflows and operator interfaces."
type: Research software
status: Active development
period: 2025—2026
role: Software development and system integration
stack:
  - Python
  - PySide6
  - Hardware I/O
  - Telemetry
repository: https://github.com/Sven-Lutz/INT
repository_public: false
featured: true
order: 1
---

## The problem

Experimental systems are not only data-analysis problems. Pumps, valves and sensors have to communicate reliably; protocols need to be repeatable; operators need a clear interface; and measurements must remain traceable after an experiment ends.

INT brings these responsibilities into one application for filtration and Aqua setups. It is the kind of software that sits between physical equipment, research questions and day-to-day operation.

## The approach

The application separates hardware communication, pressure and flow control, experiment workflows, telemetry and data logging. A PySide6 interface gives operators a direct view of system state and experiment progress, while explicit safety behaviour places outputs into a known state when execution is interrupted or an error occurs.

Development is organized around a shared core and setup-specific branches. This keeps common components reusable without pretending that different experimental rigs are identical.

## What this project demonstrates

- Applied programming in a hardware-connected research environment
- Translating experimental procedures into maintainable software workflows
- Designing for observability, reproducibility and operator safety
- Balancing reusable architecture with setup-specific constraints

## Current state

The system is under active development and the repository is private because it contains environment-specific research code. This page therefore documents the engineering scope without publishing operational details or external dependencies.
