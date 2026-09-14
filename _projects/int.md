---
title: "Experimental Process-Control Software"
short_title: "INT: Experimental Process Control"
slug: int
description: "A modular Python application for controlling laboratory filtration and Aqua systems, connecting hardware, experiment workflows and operator interfaces."
type: Research software
status: Active development
period: 2025—present
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
metrics: "Interface : PySide6 : operator-facing | Layers : 4 : UI to hardware | Repository : private : environment-specific code" 
---

## The problem

Experimental systems are not only data-analysis problems. Pumps, valves and sensors have to communicate reliably; protocols need to be repeatable; operators need a clear interface; and measurements must remain traceable after an experiment ends.

INT brings these responsibilities into one application for filtration and Aqua setups. It is the kind of software that sits between physical equipment, research questions and day-to-day operation.

## The approach

The application separates hardware communication, pressure and flow control, experiment workflows, telemetry and data logging. A PySide6 interface gives operators a direct view of system state and experiment progress, while explicit safety behaviour places outputs into a known state when execution is interrupted or an error occurs.

<figure class="diagram">
  <svg class="diagram__svg" viewBox="0 0 640 296" role="img" aria-labelledby="int-arch-title int-arch-desc">
    <title id="int-arch-title">Layered architecture of the process-control application</title>
    <desc id="int-arch-desc">An operator interface sits above three parallel concerns — experiment workflows, control loops, and telemetry with logging — which in turn sit above hardware input and output. Safe-state handling spans the control and hardware layers.</desc>

    <defs>
      <marker id="int-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
        <path class="diagram__arrow" d="M0 0 L8 4 L0 8 z"></path>
      </marker>
    </defs>

    <rect class="diagram__box" x="8" y="8" width="480" height="44" rx="3"></rect>
    <text class="diagram__text" x="28" y="30">Operator interface</text>
    <text class="diagram__text--muted" x="28" y="45">PySide6 — system state, experiment progress</text>

    <rect class="diagram__fill" x="8" y="92" width="152" height="60" rx="3"></rect>
    <text class="diagram__text" x="26" y="118">Experiment</text>
    <text class="diagram__text" x="26" y="134">workflows</text>

    <rect class="diagram__fill" x="172" y="92" width="152" height="60" rx="3"></rect>
    <text class="diagram__text" x="190" y="118">Control loops</text>
    <text class="diagram__text--muted" x="190" y="134">pressure, flow</text>

    <rect class="diagram__fill" x="336" y="92" width="152" height="60" rx="3"></rect>
    <text class="diagram__text" x="354" y="118">Telemetry</text>
    <text class="diagram__text--muted" x="354" y="134">and data logging</text>

    <rect class="diagram__box" x="8" y="192" width="480" height="44" rx="3"></rect>
    <text class="diagram__text" x="28" y="214">Hardware I/O</text>
    <text class="diagram__text--muted" x="28" y="229">pumps, valves, sensors</text>

    <rect class="diagram__box diagram__box--accent" x="516" y="92" width="116" height="144" rx="3"></rect>
    <text class="diagram__text" x="574" y="152" text-anchor="middle">Safe-state</text>
    <text class="diagram__text" x="574" y="168" text-anchor="middle">handling</text>
    <text class="diagram__text--muted" x="574" y="188" text-anchor="middle">on error or</text>
    <text class="diagram__text--muted" x="574" y="202" text-anchor="middle">interruption</text>

    <path class="diagram__line" d="M84 52 L84 88" marker-end="url(#int-arrow)"></path>
    <path class="diagram__line" d="M248 52 L248 88" marker-end="url(#int-arrow)"></path>
    <path class="diagram__line" d="M412 52 L412 88" marker-end="url(#int-arrow)"></path>
    <path class="diagram__line" d="M84 152 L84 188" marker-end="url(#int-arrow)"></path>
    <path class="diagram__line" d="M248 152 L248 188" marker-end="url(#int-arrow)"></path>
    <path class="diagram__line" d="M412 152 L412 188" marker-end="url(#int-arrow)"></path>
    <path class="diagram__line diagram__line--accent" stroke-dasharray="3 4" d="M516 122 L492 122"></path>
    <path class="diagram__line diagram__line--accent" stroke-dasharray="3 4" d="M516 214 L492 214"></path>

    <text class="diagram__text--mono" x="8" y="272">shared core</text>
    <text class="diagram__text--muted" x="96" y="272">+ setup-specific branches per experimental rig</text>
  </svg>
  <figcaption>Figure 1. Responsibilities are separated so that a change to one experimental rig does not reach into hardware communication or safety behaviour.</figcaption>
</figure>

Development is organized around a shared core and setup-specific branches. This keeps common components reusable without pretending that different experimental rigs are identical.

## What this project demonstrates

- Applied programming in a hardware-connected research environment
- Translating experimental procedures into maintainable software workflows
- Designing for observability, reproducibility and operator safety
- Balancing reusable architecture with setup-specific constraints

## Current state

The system is under active development and the repository is private because it contains environment-specific research code. This page therefore documents the engineering scope without publishing operational details or external dependencies.
