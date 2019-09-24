import React,{Component} from 'react';
import {Module} from 'react-360-web';
import * as THREE from 'three';
import {Animated, View, asset, NativeModules} from 'react-360';
import Entity from 'Entity';
export default class CubeModule extends Module{

    scene: THREE.scene;
    constructor(scene) {
        super('Cube123');
        this.scene = scene;
    }
    add() {
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = -4;
        this.scene.add(mesh);
    }
}

const Cube123 = NativeModules.;
export default class AnimatedComponent extends React.Component{
    constructor() {
        super();
        Cube123.add();
    }
    render() {
        return (
            <View
                style={{
                    height: 100,
                    width: 200,
                    transform: [{translate: [0, 0, -3]}],
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    layoutOrigin: [0.5, 0, 0],
                    alignItems: 'center',
                }}
            >
            </View>
        );
    }
}