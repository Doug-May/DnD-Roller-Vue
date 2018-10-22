<template>
    <div id="room" class="myCard">
        <room-chat v-if="this.$store.state.inRoom"/>
        <join-room v-else/>        
    </div>
</template>

<script>
import JoinRoom from "@/components/user/JoinRoom.vue";
import RoomChat from "@/components/utility/RoomChat.vue";
export default {
    components: {
        JoinRoom,
        RoomChat
    }
}
</script>


<style scoped>
    #room{
        margin-bottom: 60px;
    }
</style>
