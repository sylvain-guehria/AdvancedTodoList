<template>
  <component
    :is="_is"
    contenteditable
    :placeholder="placeholder"
    @input="onInput"
    ref="contenteditable"
    @keydown="$emit('keydown', $event)"
    @keydown.enter="$emit('keyup', $event)"
    @keypress="$emit('keypress', $event)"
    @blur="blur($event)"
    @click="$emit('click')" >
  </component> 
</template>

<script>
import { isNumber, isString } from "lodash";

export default {
  name: "input-contenteditable",
  props: {
    _is: {
      type: String,
      default: "p",
    },
    placeholder: String,
    value: {
      default: "",
    },
    maxlength: {
      type: Number,
      default: -1,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      lastText: this.value, //Initally set to value if exists
    };
  },
  mounted() {
    this.$refs.contenteditable.textContent = this.value;
  },
  watch: {
    value() {
      if (this.value !== this.$refs.contenteditable.innerText) {
        this.$refs.contenteditable.textContent = this.value;
      } else {
        this.$refs.contenteditable.textContent = this.$refs.contenteditable.textContent;
      }
    },
  },
  methods: {
    blur(e) {
      this.$emit("giveTodoKey");
      this.$emit("blur",e);
    },
    async onInput(e) {
      let text = this.$refs.contenteditable.textContent;

      this.$emit("giveTodoKey");

      //empeche le user d'inserer une lettre si input number
      if (text != null && this.type === "number" && !text.match(/^[0-9]+$/)) {
        let textNoLetter = text.replace(/\D/g, "");
        this.$refs.contenteditable.textContent = text.replace(/\D/g, "");
        this.$emit("input", textNoLetter);
        return;
      } else if (text != null && this.type === "number" && text.match(/^[0-9]+$/)) {
        this.$emit("input", text);
      }

      //enforce a maxlength
      if (this.maxlength !== -1) {
        let selection = window.getSelection();
        let { anchorNode, anchorOffset } = selection;

        if (
          text.length > this.maxlength ||
          (text != "" && this.type === "number" && !this.isReallyaNumber(text))
        ) {
          const textNodes = Array.from(this.$refs.contenteditable.childNodes);
          const realAnchorOffset =
            textNodes.length <= 1
              ? anchorOffset
              : textNodes
                  //Collect all nodes up to, but not including, anchorNode
                  .slice(0, textNodes.indexOf(anchorNode))
                  //Map them all to their length
                  .map((n) => n.textContent.length)
                  //Sum them together
                  .reduce((acc, itm) => acc + itm, 0) +
                //And then add the final offset in the final node
                anchorOffset;

          //Use either the lastText if exists, or the current text but trimmed
          const newTextToSet = this.lastText || text.slice(0, this.maxlength);

          let newOffsetToSet = realAnchorOffset - (text.length - newTextToSet.length);
          newOffsetToSet = Math.min(newOffsetToSet, this.maxlength); // Make sure not over maxlength
          //make a new text node (so don't use anchorNode for selection.collapse())
          this.$refs.contenteditable.textContent = newTextToSet;

          //Set selection using last valid offset
          selection.collapse(this.$refs.contenteditable.childNodes[0], newOffsetToSet);
          this.lastText = newTextToSet;
          return;
        } else {
          this.lastText = text;
        }
      }

      //empeche le user d'inserer un espace seul
      if (text != null && text.trim().length == 0) {
        this.$refs.contenteditable.textContent = null;
        this.$emit("input", null);
      } else {
        this.$emit("input", text);
      }
    },
    isReallyaNumber(value) {
      return (
        isNumber(value) || (isString(value) && Boolean(value.trim()) && isFinite(value))
      );
    },
  },
};
</script>

<style scoped="true">
[contenteditable] {
  cursor: text;
}

[contenteditable]:empty:before {
  content: attr(placeholder);
  color: rgba(50, 50, 50, 0.5);
}
</style>
