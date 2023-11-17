<template>
  <q-page class="q-pa-sm">
    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="home" size="44px" />
          </q-item-section>
          <q-item-section>
            <div class="text-h6">Administar usuarios</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="row">
      </q-card-section>
    </q-card>
    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
      </q-card-section>
      <q-card-section class="q-pa-none q-ma-none">

        <q-table
          class="no-shadow no-border"
          :rows="sales_data"
          :columns="sales_column"
          hide-bottom
        >
          <template v-slot:body-cell-Usuario="props">
            <q-td :props="props">
              <q-item>
                <q-item-section>
                  <q-avatar square>
                    <img :src="props.row.Usuario" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ props.row.code }}</q-item-label>
                  <q-item-label>{{ props.row.product_name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
          <template v-slot:body-cell-Name="props">
            <q-td :props="props">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="props.row.avatar" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ props.row.name }}</q-item-label>
                  <q-item-label caption class=""
                    >Fecha de compra: <br />{{ props.row.date }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-td>
          </template>
          <template v-slot:body-cell-Status="props">
            <q-td :props="props" class="text-left">
              <q-chip
                class="text-white text-capitalize"
                :label="props.row.status"
                :color="getChipColor(props.row.status)"
              ></q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-Stock="props">
            <q-td :props="props">
              <q-item>
                <q-item-section>
                  <q-item-label>
                    <span class="text-blue">
                      <q-icon
                        name="bug_report"
                        color="blue"
                        size="20px"
                        v-if="props.row.type == 'error'"
                      ></q-icon>
                      <q-icon
                        name="settings"
                        color="blue"
                        size="20px"
                        v-if="props.row.type == 'info'"
                      ></q-icon>
                      <q-icon
                        name="flag"
                        color="blue"
                        size="20px"
                        v-if="props.row.type == 'success'"
                      ></q-icon>
                      <q-icon
                        name="fireplace"
                        color="blue"
                        size="20px"
                        v-if="props.row.type == 'warning'"
                      ></q-icon>
                      {{ props.row.stock }}
                    </span>
                    <q-chip
                      class="float-right text-white text-capitalize"
                      :label="props.row.type"
                      color="positive"
                      v-if="props.row.type == 'success'"
                    ></q-chip>
                    <q-chip
                      class="float-right text-white text-capitalize"
                      :label="props.row.type"
                      color="info"
                      v-if="props.row.type == 'info'"
                    ></q-chip>
                    <q-chip
                      class="float-right text-white text-capitalize"
                      :label="props.row.type"
                      color="warning"
                      v-if="props.row.type == 'warning'"
                    ></q-chip>
                    <q-chip
                      class="float-right text-white text-capitalize"
                      :label="props.row.type"
                      color="negative"
                      v-if="props.row.type == 'error'"
                    ></q-chip>
                  </q-item-label>
                  <q-item-label caption class="">
                    <q-linear-progress
                      dark
                      :color="getColor(props.row.Progress)"
                      :value="props.row.Progress / 100"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

const sales_column = [
  {
    name: "Name",
    label: "Nombre",
    field: "name",
    sortable: true,
    align: "center",
  },
  {
    name: "Products",
    label: "Usuario",
    field: "Products",
    sortable: true,
    align: "center",
  },
  {
    name: "Total",
    label: "Especialidad",
    field: "total",
    align: "center",
    classes: "text-bold",
  },
  {
    name: "Status",
    label: "Estado",
    field: "status",
    sortable: true,
    align: "center",
    classes: "text-bold",
  },
  {
    name: "Stock",
    label: "Control",
    field: "task",
    align: "left",
  },
];

export default defineComponent({
  name: "DashboardPage",
  components: {},
  setup() {
    return {
      slide: ref(1),
      tab: ref("contact"),
      sales_column,
      sales_options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Coordinate axis indicator, coordinate axis trigger is valid
            type: "shadow", // The default is a straight line, optional:'line' |'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "Fashions",
            type: "bar",
            data: [40, 45, 27, 50, 32, 50, 70, 30, 30, 40, 67, 29],
            color: "#546bfa",
          },
          {
            name: "Electronics",
            type: "bar",
            data: [124, 100, 20, 120, 117, 70, 110, 90, 50, 90, 20, 50],
            color: "#3a9688",
          },
          {
            name: "Toys",
            type: "bar",
            data: [17, 2, 0, 29, 20, 10, 23, 0, 8, 20, 11, 30],
            color: "#02a9f4",
          },
          {
            name: "Vouchers",
            type: "bar",
            data: [20, 100, 80, 14, 90, 86, 100, 70, 120, 50, 30, 60],
            color: "#f88c2b",
          },
        ],
      },
      pie_options: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["Fashions", "Electronics", "Toys", "Vouchers"],
        },
        series: [
          {
            name: "Sales",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 335,
                name: "Fashions",
                itemStyle: {
                  color: "#546bfa",
                },
              },
              {
                value: 310,
                name: "Electronics",
                itemStyle: {
                  color: "#3a9688",
                },
              },
              {
                value: 234,
                name: "Toys",
                itemStyle: {
                  color: "#02a9f4",
                },
              },
              {
                value: 135,
                name: "Vouchers",
                itemStyle: {
                  color: "#f88c2b",
                },
              },
              {name: 'SalesTable',
                props: {
                rows: Array,
                columns: Array,
                pagination: Object,
                loading: Boolean
                }
              }
            ],
          },
        ],
      },
      sales_chart: null,
      pie_chart: null,

      getColor(val) {
        if (val > 70 && val <= 100) {
          return "green";
        } else if (val > 50 && val <= 70) {
          return "blue";
        }
        return "red";
      },
      getChipColor(status) {
        if (status == "Cancelado") {
          return "negative";
        } else if (status == "Enviado") {
          return "positive";
        } else if (status == "Pendiente") {
          return "warning";
        } else if (status == "Pagado") {
          return "info";
        } else {
          return "dark";
        }
      },
    };
  },
});
</script>

<style scoped></style>

