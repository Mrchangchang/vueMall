<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="" />
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">&yen;{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cart-control :food="food"></cart-control>
                    </div>
                    <transition name="fade">
                        <div class="buy" @click="addFirst" v-show="!food.count || food.count == 0">
                        加入购物车
                        </div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :select-type="selectType" v-on="{'select':_select,'toggleContent':_toggleContent}" 
                    :only-content="onlyContent" :desc="desc" :ratings="food.ratings">
                    </ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length" class="">
                            <li v-for ="rating in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.name}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rateTime}}</div>
                            </li>
                        </ul>
                        <div class="notayinys" v-show="!food.ratings || !food.ratings.length" ></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    
</template>
<script type="text/ecmascript-6">
import BScroll from "Better-scroll"
import cartControl from "../cartCotrol/cartControl.vue"
import Bus from "../bus/bus.vue";
import Vue from "vue";
import split from "../split/split.vue";
import ratingselect from "../ratingselect/ratingselect.vue";
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        props: {
            food: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: "全部",
                    positive: "推荐",
                    negative: "吐槽"
                }
            }
        },
        methods: {
            show() {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food,{
                            click: true
                        })
                    } else {
                        this.scroll.refresh();
                    }
                })
            },
            hide() {
                this.showFlag = false;
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                Bus.$emit("cart.add",event.target)
                Vue.set(this.food,"count",1)
            },
            _select(event) {
                this.selectType = event
            },
            _toggleContent(event) {
                this.onlyContent = !this.onlyContent;
            }
        },
        components: {
            cartControl,
            split,
            ratingselect
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/stylus" lang="stylus">
    .food
        position: fixed
        left: 0
        top: 0
        bottom: 48px
        z-index: 30
        width: 100%
        background: rgb(255,255,255)
        transition: all 0.4s linear
        transform: translate3d(0,0,0)
        &.move-enter,&.move-leave-active
            transform: translate3d(100%,0,0)
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img
                position: absolute
                top: 0
                left: 0
                height: 100%
                width: 100%
            .back
                position: absolute
                top: 10px
                left: 0
                .icon-arrow_lift
                    display: block
                    padding: 10px
                    font-size: 20px
                    color: #fff
        .content
            padding: 18px
            position: relative
            .title
                line-height: 14px
                margin-bottom: 8px
                font-size: 14px
                font-weight: 700
                color: rgb(7,17,27)
            .detail
                margin-bottom: 8px
                line-height: 10px
                font-size: 0
                .sell-count,.rating
                    font-size: 10px
                    color: rgb(147,164,169)
                .sell-count
                    margin-right: 12px
            .price
                font-weight: 700
                line-height: 24px
                .now
                    margin-right: 8px
                    font-size: 14px
                    color: rgb(140,20,20)
                .old
                    text-decoration: line-through
                    font-size: 10px
            .cartcontrol-wrapper
                position: absolute
                right: 18px
                bottom: 18px
            .buy
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box;
                font-size: 10px
                border-radius: 12px
                color: #fff
                background: rgb(0,160,220)
                &.fade-enter-avtice,&.fade-leave-active
                    opacity: 1
                   &.fade-enter,&.fade-leave-active transition: all 0.2s
                &.fade-enter,&.fade-leave-active
                    opacity: 0
        .info
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 6px
                font-size: 14px
                color: rgb(7,17,27)
            .text
                line-height: 24px
                padding: 0 8px
                font-size: 12px
                color: rgb(77,85,93)
        .title
            padding-top: 18px
            padding-left: 18px
            font-size: 14px
            color: rgb(7,17,27)
                
</style>

