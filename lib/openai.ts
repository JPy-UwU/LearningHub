<<<<<<< HEAD
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
=======
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
});

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
<<<<<<< HEAD
) {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output ${
      list_output && "an array of objects in"
    } the following in json format: ${JSON.stringify(
=======
): Promise<
  {
    question: string;
    answer: string;
  }[]
> {
  // if the user input is in a list, we also process the output as a list of json
  const list_input: boolean = Array.isArray(user_prompt);
  // if the output format contains dynamic elements of < or >, then add to the prompt to handle dynamic elements
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  // if the output format contains list elements of [ or ], then we add to the prompt to handle lists
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  // start off with no error message
  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output the following in json format: ${JSON.stringify(
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
      output_format
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

<<<<<<< HEAD
=======
    // if output_format contains dynamic elements, process it accordingly
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

<<<<<<< HEAD
    if (list_input) {
      output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
    }

    // Use OpenAI to get a response
    const response = await openai.chat.completions.create({
=======
    // if input is in a list format, ask it to generate json in a list
    if (list_input) {
      output_format_prompt += `\nGenerate a list of json, one json for each input element.`;
    }

    // Use OpenAI to get a response
    const response =  await openai.chat.completions.create({
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
      temperature: temperature,
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

<<<<<<< HEAD
    let res: string = response.choices[0].message?.content?.replace(/'/g, '"') ?? "";
=======
    let res: string =
      response.choices[0].message?.content?.replace(/'/g, '"') ?? "";

    // ensure that we don't replace away apostrophes in text
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
    res = res.replace(/(\w)"(\w)/g, "$1'$2");

    if (verbose) {
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

<<<<<<< HEAD
=======
    // try-catch block to ensure output format is adhered to
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
    try {
      let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
<<<<<<< HEAD
          throw new Error("Output format not in an array of json");
=======
          throw new Error("Output format not in a list of json");
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
        }
      } else {
        output = [output];
      }

<<<<<<< HEAD
      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
=======
      // check for each element in the output_list, the format is correctly adhered to
      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          // unable to ensure accuracy of dynamic output header, so skip it
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
          if (/<.*?>/.test(key)) {
            continue;
          }

<<<<<<< HEAD
=======
          // if output field missing, raise an error
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
          if (!(key in output[index])) {
            throw new Error(`${key} not in json output`);
          }

<<<<<<< HEAD
          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
=======
          // check that one of the choices given for the list of words is an unknown
          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            // ensure output is not a list
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            // output the default category (if any) if GPT is unable to identify the category
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            // if the output is a description format, get only the label
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

<<<<<<< HEAD
        if (output_value_only) {
          output[index] = Object.values(output[index]);
          
=======
        // if we just want the values for the outputs
        if (output_value_only) {
          output[index] = Object.values(output[index]);
          // just output without the list if there is only one element
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
<<<<<<< HEAD
      console.log("Current invalid json format ", res);
=======
      console.log("Current invalid json format:", res);
>>>>>>> 5e9699b9c916059dd67ed6b794798c88d71d554e
    }
  }

  return [];
}