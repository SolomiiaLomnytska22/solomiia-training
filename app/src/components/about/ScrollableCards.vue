<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CardsItem } from '@/types'

@Component({})
export default class ScrollableCards extends Vue {
  @Prop({ required: true }) items!: CardsItem[]
}
</script>

<template>
  <div class="scrollable-cards">
    <div
      v-for="item in items"
      :key="item.id"
      class="card"
    >
      <div
        class="card-image"
        :style="{ backgroundImage: 'url(' + item.image + ')' }"
      >
        <div class="image-overlay" />
        <div class="card-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollable-cards {
  display: flex;
  overflow-x: auto;
  max-width: 75%;
  margin: 20px;
}

.card {
  flex: 0 0 auto;
  margin-right: 20px;
  display: block;
  width: 300px;
  border-radius: 5px;
  overflow-x: hidden;
  position: relative;
  transition: transform 0.3s;

  .card-image {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow-x: hidden;

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: blur(2px);
      background: rgba(0, 0, 0, 0.55);
    }
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    color: rgba(255, 255, 255, 0.9);
    text-align: center;

    h3 {
      margin-bottom: 10px;
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
}
.card:hover {
  transform: scale(105%);
  cursor: pointer;
  .card-image .image-overlay {
    background: rgba(32, 73, 34, 0.6);
  }
}
</style>