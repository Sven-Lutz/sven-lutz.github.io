---
title: "User-Centric Forecasting for EV Charging Stations"
short_title: "EV Charging Demand Forecasting"
slug: ev-charging-forecasting
description: "My bachelor’s thesis combined user clustering and LSTM models to test whether charging-behaviour segments improve short-term load forecasts."
type: Bachelor’s thesis
status: Completed
period: 2025
role: Research design, implementation and analysis
stack:
  - Time series
  - LSTM
  - Gaussian mixtures
  - Python
repository: https://github.com/Sven-Lutz/BA_EV_Charging
repository_public: true
featured: true
order: 3
---

## Research question

Short-term forecasts for EV charging parks can support infrastructure planning and grid operation. My thesis investigated two connected questions: whether distinct groups of charging users can be identified from session data, and whether those groups add useful information to a deep-learning forecast.

## Method

After cleaning and transforming charging-session data, I used a Gaussian mixture model to identify behavioural groups. The resulting cluster-level features—such as expected values and daily patterns—were aggregated into a time series at 15-minute intervals.

I then compared two LSTM models: a standard model using temporal and charging features, and an enhanced model that also received information derived from the user clusters.

## Result

The clustering step identified three distinct patterns of charging behaviour. The forecasting result was more instructive because it contradicted the initial hypothesis: the simpler LSTM outperformed the cluster-enhanced model. The additional features appear to have introduced noise or redundancy rather than useful predictive signal.

That negative result is central to the project. More domain structure does not automatically produce a better model; the value of additional features has to be demonstrated empirically.

## Limits and next questions

The analysis used one public dataset and was completed within a twelve-week thesis period. Results therefore should not be treated as a general benchmark. Useful next steps include testing additional datasets, comparing alternative clustering and forecasting models, incorporating external signals and estimating predictive uncertainty.
