<template>
<ul>
    <li> {{hoo}} </li> <!-- Safe -->
    <li v-text="hoo"></li> <!-- Safe -->
    <li v-html="hoo"></li> <!-- Danger!! -->
</ul>
</template>

<script>
export default {
    data: () => ({
        hoo: "<img src onerror=alert(1)"
    })
}
</script>