import * as deepl from 'deepl-node';

export default class Translator {
  constructor(key) {
    this.translator = new deepl.Translator(key)
  }

  translate(text) {

  }
}