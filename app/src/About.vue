<template>
  <div class="about-us">
    <h1>Welcome to Our Company</h1>

    <section class="company-intro">
      <h1>Who We Are</h1>
      <p>
        We are a passionate team dedicated to providing innovative solutions and
        excellent services. Our journey started with a vision to make a positive
        impact in the world.
      </p>
    </section>

    <h2>Our Projects</h2>
    <ScrollableCards :items="items" />

    <section class="timeline">
      <h2>Our Journey</h2>
      <Timeline />
    </section>

    <h1>Let's build our future together!</h1>
    <router-link to="/contact">
      <Button>Contact Us</Button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Timeline from '@/components/about/Timeline.vue'
import ScrollableCards from '@/components/about/ScrollableCards.vue'
import Button from '@/components/common/Button.vue'
import { CardItem } from '@/types'

@Component({ components: { Button, Timeline, ScrollableCards } })
export default class About extends Vue {
  items: CardItem[] = [
    {
      id: 1,
      image: './images/download.jpeg',
      title: 'Versatile medical project',
      description:
        'Our client - one of the most successful and well-known medical clinic in Ukraine. '
    },
    {
      id: 2,
      image: './images/employees.webp',
      title: 'Innovate Hub',
      description:
        'We worked in cooperation with the best universities in Ukraine to create innovative working space.'
    },
    {
      id: 3,
      image: './images/employees.webp',
      title: 'TechConnect360',
      description:
        'TechConnect360 facilitates seamless connectivity and knowledge sharing among employees in the IT area.'
    },
    {
      id: 4,
      image: './images/employees.webp',
      title: 'Online Banking',
      description:
        'Do you know ThisBank or ThatBank? Thanks to us you can use mobile applications to manage your account without any trouble!'
    },
    {
      id: 5,
      image: './images/employees.webp',
      title: 'Your Project!',
      description:
        'Contact Us and this card will display perfect solution executed just for you!'
    }
  ]
}
</script>

<style scoped>
.about-us {
  margin: 50px 5% 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1,
h2,
h3 {
  color: #333;
  padding: 10px;
}

.company-intro {
  position: relative;
  overflow: hidden;
  background-image: url('../public/images/employees.webp');
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.company-intro:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(41, 94, 44, 0.8);
  backdrop-filter: blur(2px);
}

.company-intro h1,
.company-intro p {
  z-index: 1;
  position: relative;
  padding: 10px;
  color: #fff;
}

p {
  font-size: large;
}

.timeline {
  margin-top: 30px;
}

.event-details h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.event-details p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

Button {
  margin-bottom: 30px;
  font-size: large;
  color: white;
  text-decoration: none;
}
</style>
