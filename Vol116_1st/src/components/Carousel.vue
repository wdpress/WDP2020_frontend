<template>
  <div>
    <div class="carousel">
      <div
        class="itemList"
        :class="{ noTransition }"
        :style="itemListStyle"
        @click="onClick"
        @mousedown.prevent="onMousedown"
      >
        <div v-for="(item, i) in clonedList" :key="i" class="item">
          <a :href="item" target="_blank" rel="noopener">
            <img :src="item" class="img" />
          </a>
        </div>
      </div>
    </div>
    <div class="control">
      <button @click="moveIndex(-1)">←前へ</button>
      <button @click="moveIndex(1)">次へ→</button>
    </div>
    <div class="pager">
      <button
        v-for="(_, i) in itemList"
        :key="i"
        :class="{ active: normedIndex === i }"
        @click="index = i"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

const cloneCount = 2 // 左右端にクローンする枚数
const dragInitRange = 10 // dragを行ったと見なす移動量(px)
const dragSwipeRange = 100 // スワイプが発生する移動量(px)

export default Vue.extend({
  props: {
    itemList: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      dragInitX: 0,
      dragDeltaX: 0,
      noTransition: false,
      isDragged: false,
    }
  },
  computed: {
    normedIndex(): number {
      return (this.index + this.itemList.length) % this.itemList.length
    },
    itemListStyle(): Record<string, string> {
      return {
        transform: `translateX(calc(${(this.index + cloneCount) * -100}% + ${
          this.dragDeltaX
        }px))`,
      }
    },
    clonedList() {
      return [
        ...this.itemList.slice(-cloneCount),
        ...this.itemList,
        ...this.itemList.slice(0, cloneCount),
      ]
    },
  },
  methods: {
    moveIndex(diff: number) {
      if (this.index === this.normedIndex) {
        this.index += diff
        return
      }
      this.noTransition = true
      requestAnimationFrame(() => {
        this.index = this.normedIndex
        requestAnimationFrame(() => {
          this.noTransition = false
          this.index += diff
        })
      })
    },
    onClick(e: MouseEvent) {
      if (!this.isDragged) return

      // ドラッグであれば子要素をクリックしないようにする
      e.stopPropagation()
      e.preventDefault()
    },
    onMousedown(e: MouseEvent) {
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.onDragend)
      this.dragInitX = e.clientX
      this.noTransition = true
      this.index = this.normedIndex
    },
    onDrag(e: MouseEvent) {
      this.dragDeltaX = e.clientX - this.dragInitX
    },
    onDragend() {
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.onDragend)

      const absDelta = Math.abs(this.dragDeltaX)

      // ドラッグしたかどうか判定
      this.isDragged = absDelta > dragInitRange

      // スワイプするかどうか判定
      if (absDelta > dragSwipeRange) {
        this.index += this.dragDeltaX > 0 ? -1 : 1
      }

      this.noTransition = false
      this.dragDeltaX = 0
    },
  },
})
</script>

<style lang="scss" scoped>
.carousel {
  display: flex;
  width: 100%;
  overflow: hidden;
}
.itemList {
  display: flex;
  transition: ease 0.2s;
  &.noTransition {
    transition: none;
  }
}
.item {
  flex: none;
  width: 100%;
}
.img {
  height: auto;
  width: 100%;
}
.pager {
  button.active {
    background: #ff6;
  }
}
</style>
