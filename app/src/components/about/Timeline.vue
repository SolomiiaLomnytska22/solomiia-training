<template>
  <div class="timeline">
    <div
      v-for="event in timeline"
      :key="event.id"
      :class="['container', event.id % 2 === 0 ? 'left' : 'right']"
    >
      <div class="event-details">
        <div class="event-date">
          {{ event.date }}
        </div>
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Timeline extends Vue {
  timeline = [
    {
      id: 1,
      date: 'January 2010',
      title: 'Company Inception',
      description: 'Founded with the goal of making a difference.'
    },
    {
      id: 2,
      date: 'June 2012',
      title: 'First Product Launch',
      description: 'Introduced our first product to the market.'
    },
    {
      id: 3,
      date: 'March 2015',
      title: 'Expansion',
      description: 'Opened new offices to serve more customers globally.'
    },
    {
      id: 4,
      date: 'April 2018',
      title: 'Achievements',
      description: 'Received industry awards for excellence and innovation.'
    },
    {
      id: 5,
      date: 'Present',
      title: 'Continued Growth',
      description: 'Continuing to evolve and grow with our customers.'
    }
  ]
}
</script>

<style scoped>

.timeline {
  position: relative;
  margin: 0 auto;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: #4caf50;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

.container {
  padding: 10px 40px;
  position: relative;
  width: 50%;
}

.event-details {
  transition: padding 0.3s, background-color 0.3s, transform 0.3s;
}

.event-details:hover {
  padding: 15px;
  background-color: rgba(76, 175, 80, 0.2);
  transform: scale(1.05);
}

.container::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: white;
  border: 4px solid rgba(76, 175, 80, 0.5);
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

.left, .right {
  position: relative;
  text-align: left;
}

.left {
  left: -80px;
}

.right {
  left: 50%;
}

.left::before, .right::before {
  content: ' ';
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
}

.left::before {
  right: 63px;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #ffffff;
}

.right::before {
  left: 30px;
  border-width: 10px 10px 10px 0;
  border-color: transparent #ffffff transparent transparent;
}

.right::after {
  left: -16px;
}

.event-date {
  color: #4caf50;
  font-size: larger;
  font-weight: bold;
}

@media screen and (max-width: 600px) {
  .timeline::after {
    left: 30px;
  }

  .container {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  .container::before {
    left: 60px;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  .left::after, .right::after {
    left: 15px;
  }

  .left, .right {
    left: 0;
  }
}
</style>

