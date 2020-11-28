<template>
  <div>
    <div id="chart">
      <apexchart
        type="scatter"
        height="650"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>
<script lang="ts">
import { Todo } from "@/common/models/types";
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { myFunctions } from "@/common/helpers/helperfunction";

@Component({
  components: {},
})
export default class EisenhowerChart extends Vue {
  todolist: Todo[] = [];

  todoRedlist: Todo[] = [];
  todoOrangelist: Todo[] = [];
  todoBluelist: Todo[] = [];
  todoGreenlist: Todo[] = [];

  getNumberdaysleft = myFunctions.getNumberdaysleft;

  created() {
    this.todolist = [...this.$store.getters.getTodoList];

    if (this.todolist) {
      this.todolist.forEach((todo: Todo) => {
        todo.numberdaysleft = this.getNumberdaysleft(todo.deadline);
        if (todo.numberdaysleft >= 0) {
          todo.urgency = (10 - todo.numberdaysleft) * 10;
        } else {
          todo.urgency = 100;
        }
        if (todo.urgency < 0) {
          todo.urgency = 0;
        }
      });

      this.fillUpColoredTodoList();
      this.fillUpSeries();
    }
  }

  fillUpColoredTodoList(): void {
    this.todoRedlist = this.todolist.filter(
      (todo) =>
        myFunctions.getNumberdaysleft(todo.deadline) < 2 && todo.importance >= 50
    );

    this.todoOrangelist = this.todolist.filter(
      (todo) =>
        myFunctions.getNumberdaysleft(todo.deadline) >= 2 && todo.importance >= 50
    );

    this.todoBluelist = this.todolist.filter(
      (todo) =>
        myFunctions.getNumberdaysleft(todo.deadline) < 2 && todo.importance < 50
    );

    this.todoGreenlist = this.todolist.filter(
      (todo) =>
        myFunctions.getNumberdaysleft(todo.deadline) >= 2 && todo.importance < 50
    );
  }

  fillUpSeries() {
    this.todoRedlist.forEach((todo) =>
      this.serie1.data.push([todo.urgency, todo.importance, todo.key])
    );

    this.todoOrangelist.forEach((todo) =>
      this.serie2.data.push([todo.urgency, todo.importance, todo.key])
    );

    this.todoBluelist.forEach((todo) =>
      this.serie3.data.push([todo.urgency, todo.importance, todo.key])
    );

    this.todoGreenlist.forEach((todo) =>
      this.serie4.data.push([todo.urgency, todo.importance, todo.key])
    );
  }

  serie1 = {
    id: 1,
    name: "",
    color: "#ff595e",
    data: [],
  };

  serie2 = {
    id: 2,
    name: "",
    color: "#ffca3a",
    data: [],
  };

  serie3 = {
    id: 3,
    name: "",
    color: "#3bbeef",
    data: [],
  };

  serie4 = {
    id: 4,
    name: "",
    color: "#57aa32",
    data: [],
  };

  series = [this.serie1, this.serie2, this.serie3, this.serie4];

  chartOptions = {
    chart: {
      height: 350,
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    markers: {
      // FIXME : display task
      onClick: function (e) {
      },
    },
    xaxis: {
      title: {
        text: "Urgency of the task",
        style: {
          fontSize: "17px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      min: 0,
      max: 100,
      labels: {
        formatter: function (val) {
          return parseFloat(val).toFixed(1);
        },
      },
    },
    yaxis: {
      title: {
        text: "Importance of the task",
        style: {
          fontSize: "17px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      min: 0,
      max: 100,
    },
  };
}
</script>
