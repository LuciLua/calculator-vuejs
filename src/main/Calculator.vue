<template>
  <div class="calculator">
    <Display :value="displayValue" />
    <Button label="AC" triple @onClick="clearMemory" />
    <Button label="/" operation @onClick="setOperation" />
    <Button label="7" @onClick="addDigit" />
    <Button label="8" @onClick="addDigit" />
    <Button label="9" @onClick="addDigit" />
    <Button label="*" operation @onClick="setOperation" />
    <Button label="4" @onClick="addDigit" />
    <Button label="5" @onClick="addDigit" />
    <Button label="6" @onClick="addDigit" />
    <Button label="-" operation @onClick="setOperation" />
    <Button label="1" @onClick="addDigit" />
    <Button label="2" @onClick="addDigit" />
    <Button label="3" @onClick="addDigit" />
    <Button label="+" operation @onClick="setOperation" />
    <Button label="0" double @onClick="addDigit" />
    <Button label="." @onClick="addDigit" />
    <Button label="=" operation @onClick="setOperation" />
  </div>
</template>

<script>
import Display from "../components/Display.vue";
import Button from "../components/Button.vue";

export default {
  data: function () {
    return {
      displayValue: "0",
      clearDisplay: false,
      operation: null,
      values: [0, 0],
      current: 0, // 0 ou 1, valor trabalhado atualmente
    };
  },

  components: { Button, Display },
  methods: {
    clearMemory() {
      // atribuindo no this.$data, o estado inicial do objeto
      Object.assign(this.$data, this.$options.data());
    },
    setOperation(operation) {
      if (this.current === 0) {
        // primeira vez que esta setando operacao
        this.operation = operation;
        this.current = 1;
        this.clearDisplay = true;
      } else {
        // quando a operacao for "=" armazena na constante equals
        const equals = operation === "=";
        const currentOperation = this.operation;

        try {
          // o current 0 (primeiro valor) agora será o resultado da operacao do anterior primerio com segundo
          this.values[0] = eval(
            `${this.values[0]}${currentOperation}${this.values[1]}`
          );
        } catch (e) {
          this.$emit("onError", e);
        }

        this.values[1] = 0; // indice 1 zera para ficar pronto para outra operacao

        this.displayValue = this.values[0]; // resultado da operacao colocado no display
        this.operation = equals ? null : operation; // se nao for equals, bota nulo
        this.current = equals ? 0 : 1;
        this.clearDisplay = !equals; // limpa display se for diferente de quals
      }
    },
    addDigit(n) {
      if (n === "." && this.displayValue.includes(".")) {
        // se ja tiver sido atribuido algum ponto, saia da funcao
        return;
      }
      const clearDisplay = this.displayValue === "0" || this.clearDisplay;

      // se precisar limpar display, current valu vazio, se n usa this.diaplyValue para setar o valor atual
      const currentValue = clearDisplay ? "" : this.displayValue;
      // display value é uma constante dentro dessa funcao, mas so
      // this.displayValue consegue acessar o valor que faz parte de data
      const displayValue = currentValue + n;
      this.displayValue = displayValue;
      this.clearDisplay = false;
      this.values[this.current] = displayValue;
    },
  },
};
</script>

<style>
.calculator {
  height: 320px;
  width: 235px;
  border-radius: 5px;
  overflow: hidden;

  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: 1fr 48px 48px 48px 48px 48px;
}
</style>