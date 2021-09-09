/*
 * SPDX-FileCopyrightText: 2021 Stefan Begerad <stefan@begerad.de>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
# axios
Client using axios library to send a HTTP GET request.

## Overview
This repository provides a command line interface service for Linux based operating system.

## Preparation
Run the following command in your favorite GNU/Linux shell to install dependenies.
```
npm i
```
## Development setup
Run the following command in your favorite GNU/Linux shell if you fancy log messages for debugging.
```
export DEBUG=$DEBUG,axios
```
Run the following command in your favorite GNU/Linux shell to start the service in development mode.
```
npm run dev
```
## Production deployment
Run the following command in your favorite GNU/Linux shell to start the service for production mode.
```
npm run start
```
