<template>
  <div class="contact">
    <div class="left-section">
      <img
        src="../public/images/contact-page.jpeg"
        alt="Contact Image"
      >
    </div>
    <div class="right-section">
      <h1>Contact Us</h1>
      <p>Email: info@example.com</p>
      <p>Phone: +1 123 456 7890</p>

      <div class="social-links">
        <a
          v-for="(link, index) in socialLinks"
          :key="index"
          :href="link.href"
          target="_blank"
        >
          <font-awesome-icon
            :size="link.size"
            :icon="link.icon"
          />
        </a>
      </div>
      <div class="separator" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164705.66804725432!2d23.847429798887532!3d49.83257222012471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7c09109a57%3A0x4223c517012378e2!2sLviv%2C%20Lviv%20Oblast%2C%2079000!5e0!3m2!1sen!2sua!4v1701822074265!5m2!1sen!2sua"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
      <div class="separator" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Contact extends Vue {
  socialLinks = [
    {
      href: 'https://www.facebook.com',
      size: 'xl',
      icon: 'fa-brands fa-instagram'
    },
    {
      href: 'https://www.linkedin.com',
      size: 'xl',
      icon: 'fa-brands fa-linkedin'
    },
    {
      href: 'https://www.twitter.com',
      size: 'xl',
      icon: 'fa-brands fa-x-twitter'
    }
  ]
}
</script>

<style scoped>
.contact {
  margin: 50px 0 0;
  display: flex;
  justify-content: space-between;
}

.left-section {
  flex: 1;
  height: 100vh;
}

.left-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right-section {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-links {
  margin-top: 20px;
  margin-bottom: 30px;
}

.social-links a {
  color: #333;
  margin: 0 10px;
}

.social-links a:hover {
  color: #4caf50;
}

iframe {
  border: 0;
  height: 450px;
  margin-top: 50px;
  width: 100%;
  margin-bottom: 50px;
}

.separator {
  height: 5px;
  width: 70%;
  background-color: rgba(76, 175, 80, 0.5);
  border-radius: 5px;
}

@media screen and (max-width: 600px) {
  .left-section {
    display: none;
  }

  .right-section {
    background-color: rgba(76, 175, 80, 0.2);
  }

  .separator {
    background-color: #333;
  }
}
</style>
