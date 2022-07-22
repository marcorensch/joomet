<template>
  <div class="nx-text-xsmall uk-text-meta">
    <span class="status-led" :class="[onlineStatus.online ? 'status-online' : 'status-offline']"></span>
    <span id="status-text" class="">{{ statusText }}</span>
  </div>
</template>

<script>
import {useOnlineStatus} from "@/stores/online"
export default {
  name: "OnlineStatusIndicator",
  data() {
    return {
      onlineStatus: useOnlineStatus(),
      statusText: "",
    };
  },
  mounted() {
    this.checkOnlineStatus();
    setInterval(() => {
      this.checkOnlineStatus();
    }, 10000);
  },
  methods:{
    checkOnlineStatus() {
      this.onlineStatus.online = navigator.onLine;
      this.statusText = this.onlineStatus.online ? 'Online' : 'Offline';
    }
  }
}
</script>

<style scoped>
.status-led{
  width: .5em;
  height: .5em;
  border-radius: 50%;
  display: inline-block;
  margin-right: .5em;
  margin-bottom: .15em;
  box-shadow:  inset 1px 1px 2px rgba(0,0,0,0.2);
}

.status-led.status-offline{
  background: #cb1313;
  border: .03em solid #e53b3b;
}

.status-led.status-online{
  background: #35cb13;
  border: .03em solid #3be53e;
}
.status-led.status-online:after{
  content: "";
  position: absolute;
  box-shadow: 10px 10px 10px rgba(42, 24, 24, 0.2);
}
</style>