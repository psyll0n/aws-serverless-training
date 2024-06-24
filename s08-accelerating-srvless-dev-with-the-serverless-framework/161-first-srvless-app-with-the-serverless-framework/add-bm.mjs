"use strict";

export const add = async (event, context) => {
  const { num1, num2 } = event;
  return num1 + num2;
};
