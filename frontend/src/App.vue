<template>
  <v-app>
    <v-main>
      <v-table theme="dark">
        <thead>
          <tr>
            <th class="text-left">
              Model
            </th>
            <th class="text-left">
              Serial
            </th>
            <th class="text-left">
              Owner
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="device in devices"
            :key="device.id"
          >
            <td>{{ device.model.name }}</td>
            <td>{{ device.prefix }} {{ device.serialNumber }}</td>
            <td>{{ device.owner.name }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from "axios"

export interface Model {
  id: number;
  name: string;
}

export interface Attribute {
  name: string;
  value: string;
}

export interface Machine {
  id: number;
  name: string;
  attributes?: Attribute[];
}

export interface Owner {
  id: number;
  name: string;
  location: string;
}

export interface Device {
  id: number;
  model: Model;
  owner: Owner;
  prefix?: string;
  serialNumber: string;
  description: string;
}

export default defineComponent({
  name: 'App',

  components: {
  },

  data() {
    return {
      devices: [] as Device[]
    }
  },

  async mounted() {
    try {
      const res = await axios.get(`http://localhost:3500/api/devices`)
      this.devices = res.data.data
    } catch (error) {
      console.log(error)
    }
  },
})
</script>
