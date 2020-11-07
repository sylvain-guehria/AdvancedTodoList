<template>
  <div class="flex-column">
    <md-table v-model="paginatedUsers">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Country">{{ item.country }}</md-table-cell>
        <md-table-cell md-label="City">{{ item.city }}</md-table-cell>
        <md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="Large column" class="last-column">
          {{
          item.largeData
          }}
        </md-table-cell>
        <md-table-cell md-fixed-header class="more-column right-arrow">
          <md-menu md-size="medium" :md-offset-x="-175" :md-offset-y="-120">
            <md-button md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>
                <feather type="layout" class="md-icon"></feather>
                <span>Transfer to Gate 5</span>
              </md-menu-item>
              <md-menu-item>
                <feather type="arrow-right-circle" class="md-icon"></feather>
                <span>My Item 2</span>
              </md-menu-item>
              <md-menu-item>
                <feather type="file-plus" class="md-icon"></feather>
                <span>My Item 3</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <table-pagination
      :data="users"
      @pagination="onPagination($event)"
      :serverSide="false"
      @paginationEvent="doServerPagination($event)"
    ></table-pagination>
  </div>
</template>

<script>
import TablePaginationVue from "./TablePagination.vue";
export default {
  name: "simple-table",
  components: {
    "table-pagination": TablePaginationVue
  },
  props: {},
  methods: {
    onPagination(data) {
      this.paginatedUsers = data;
    },
    doServerPagination(paginationEvent) {
      // eslint-disable-next-line no-console
      console.log(
        "previousPageIndex: " +
          paginationEvent.previousPageIndex +
          "\n" +
          "pageIndex: " +
          paginationEvent.pageIndex +
          "\n" +
          "pageSize: " +
          paginationEvent.pageSize +
          "\n" +
          "length: " +
          paginationEvent.length
      );
    }
  },
  created() {
    for (let i = 0; i < 52; i++) {
      this.users.push({
        name: "The name " + i,
        salary: Math.round(Math.random() * 30000),
        country: "Country " + i,
        city: "City " + i,
        largeData: "The big big big big big large data value"
      });
    }
    this.paginatedUsers = [...this.users];
  },
  data() {
    return {
      selected: [],
      users: [],
      paginatedUsers: []
    };
  }
};
</script>
