/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility functions for the examples set.
 * @author silvano.luciani@gmail.com (Silvano Luciani)
 */

/**
 * Formats the date object to 'yyyy-mm-dd'.
 * @param {object} date a Date object.
 * @return {string} The formatted string.
 */

function formatDate(date) {
  var dateArr = [String(date.getFullYear())];
  dateArr.push(getTwoDigitString(date.getMonth()));
  dateArr.push(getTwoDigitString(date.getDate()));
  return dateArr.join('-');
}

/**
 * Converts a numeric value to a two digit string.
 * @param {number} int a numeric value.
 * @return {string} The two digit string.
 */

function getTwoDigitString(int) {
  return int < 10 ? '0' + String(int) : String(int);
}
