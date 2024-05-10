---
layout: page
title: Semantic Mapping for Navigation
img: /assets/img/project_preview_2024_tase_mapping/example_semantickitti.png
importance: 2
category: Research
horizontal: false
---

## Real-Time Metric-Semantic Mapping for Autonomous Navigation in Outdoor Environments

**Author**: Jianhao Jiao, Ruoyu Geng, Yuanhang Li, Ren Xin, Bowen Yang, Jin Wu,
Dimitrios Kanoulas, Rui Fan, etc.

**Acknowledgement**: This is a joint research work under the support from HKUST, HKUST(GZ), Tongji University, and University College London. 

### Demo
<p align="center">
  <img src="/assets/img/2024_tase_mapping/mapping_hkustgz.gif" width="70%" />
  <p align="center">The semantic mapping process. </p>
</p>
<p align="center">
  <img src="/assets/img/2024_tase_mapping/mapping_result_path_planning_hkustgz.png" width="70%" />
  <p align="center">Traversability estimation and motion planning on the resulting occupancy map.</p>
</p>

### Background
Mapping is the process of establishing an internal representation of environments. Metric-semantic maps, which include human-readable information (*i.e.,* where map elements are labeled), offer a more profound understanding of environments. This contrasts with pure metric maps, which primarily store the geometric structure of a scene. These are typically defined by the positions of landmarks (known as a point cloud map), distances to obstacles (referred to as a distance field), or binary values that represent free and occupied spaces (occupancy map).
Recent works (shwon below) in scene abstraction (*e.g.,* [Hydra](https://github.com/MIT-SPARK/Hydra)), long-term map update (*e.g.,* [Panoptic Mapping](https://github.com/ethz-asl/panoptic_mapping)), exploration (*e.g.,* [Semantic Exploration](https://devendrachaplot.github.io/projects/semantic-exploration), and grasping (*e.g.,* [GOAT](https://theophilegervet.github.io/projects/goat)) have demonstrated the potential of semantic maps, boosting the development of embodied intelligence.

<p align="center">
  <img src="/assets/img/2024_tase_mapping/example_hydra.png" width="40%" />
  <img src="/assets/img/2024_tase_mapping/example_goat.png" width="50%" />
  <img src="/assets/img/2024_tase_mapping/example_panoptic_mapping.png" width="50%" />
  <img src="/assets/img/2024_tase_mapping/example_semantic_exploration.png" width="60%" />
</p>

Taking the KITTI scenario as an example. Many objects such as trees and buildings appear. The street is also composed of the sidewalk that is specifically designed for pedestrains. By incorporating semantics, the map enables the vehicle to navigate along the road, finding a path that is free of collisions and avoids intersecting with sidewalks and grasslands. In contrast, geometry-based traversability extraction methods often face challenges in distinguishing between roads, sidewalks, and grass due to their similar structures. This paper focuses on the point-goal navigation task of ground robots in complicated unstructured environments (*e.g.,* campus, off-road scenarios), where abundant semantic elements should be recognized to guarantee safe and highly-interactive navigation. 
<p align="center">
  <img src="/assets/img/2024_tase_mapping/example_semantickitti.png" width="60%" />
</p>

### Methodology

The overview of the method is shown as below. Please refer to the preprint for more technical details.

<p align="center">
  <img src="/assets/img/2024_tase_mapping/pipeline.png" width="60%" />
</p>

#### Metric-Semantic Mapping

Building a semantic map for large-scale outdoor environments costs much time \cite{}. Therefore, in this work, we propose an real-time **metric-semantic mapping system** which leverages LiDAR-visual-inertial sensing to **estimate the real-time state** of the robot and **construct a lighweight and global metric-semantic mesh map** of the environment. We build upon the work of NvBlox \cite{} and thus utilize a *signed distance field (SDF)*-based representation. This representation offers the advantage of constructing surfaces with sub-voxel resolution, enhancing the accuracy of the map. While the focus of this paper is on mapping outdoor environments, the proposed solution is both extensible and easily adaptable for above applications. The mapping system consists of four primary components:

1. **State Estimator** modifies the [R3LIVE](https://github.com/hku-mars/r3live) system (an Extended Kalman Filter-based LiDAR-visual-inertial odometry) to estimate real-time sensors’ poses with a local and sparse color point cloud. 
2. **Semantic Segmentation** is a pre-trained convolutional neural network (CNN) that assigns a class label to every single pixel of each input image. A novel dataset that categorizes objects into diverse classes for the network training is also developed.
3. **Metric-Semantic Mapping** takes sensors’ measurements and poses as input, and constructs a 3D global mesh of environments using the implicit SDF-based volumetric representation with semantic annotations from the 2D pixel-wise segmentation. The whole pipeline is implemented in parallel with the GPU and thus achieves the real-time performance (<*7ms* per LiDAR frame). We further propose a non-projective distance under the TSDF formulation, leading to a more accurate and complete surface reconstruction.
4. **Traversability Analysis** identifies drivable areas by analyzing the geometric and semantic attributes of the resulting mesh map, thus narrowing the search space for subsequent motion planning. For example, we can classify ''road'' regions as drivable for vehicles, while ''sidewalk'' or ''grass'' regions are not.

We publicly release our code and datasets here: https://github.com/HKUSTGZ-IADC/cobra.

#### Navigation System Integration

We also integrate the resuting map into a navigation system for a real-world autonomous vehicle. The semantic data encoded in the map translates human instructions, thereby enabling robots to navigate safely within unstructured environments. Implementation details are summarized: 

* **Prior Map-based Localization**: We use [PALoc](https://arxiv.org/abs/2401.17826) to obtain the real-time global pose of the vehicle by registering the map of the current scan. 
* **Map Process and Motion Planning**: We transform the vertices of the traversable map into a 2D occupancy grid, where cells with zero occupancy probability are considered drivable. And then we employ a hybrid A star algorithm for motion planning.
* **Path Following**: Waypoints are taken as input of the further path following module with the lateral trajectory tracking controller (for steering adjustments) and a longitudinal speed controller (for speed changes).

### Experimental Results

#### Dataset

* **SemanticKITTI**: street and urban road with GT LiDAR semantics.
* **SemanticUSL**: campus-type and off-road scenarios with GT LiDAR semantics.
* **FusionPortable**: campus-type scenarios with estimated camera semantics.

#### Real-World Experimental Platform

<p align="center">
  <img src="/assets/img/2024_tase_mapping/experiment_platform.png" width="50%" />
  <p align="center">Real-world experimental platform.</p>
</p>
#### Some Mapping Results

<p align="center">
  <img src="/assets/img/2024_tase_mapping/mapping_semantickitti.gif" width=70%" />
  <p align="center">Test on SemanticKITTI</p>
</p>
<p align="center">
  <img src="/assets/img/2024_tase_mapping/mapping_fusionportable.gif" width="70%" />
  <p align="center">Test on FusionPortable</p> 
</p>

#### Real-World Navigation Results

<p align="center">
  <img src="/assets/img/2024_tase_mapping/navigation_experiment_sequence00.gif" width="70%" />
	<p align="center">Point-goal navigation test</p>
</p>
<p align="center">
  <img src="/assets/img/2024_tase_mapping/navigation_experiment_other_sequence.gif" width="70%" />
  <p align="center">Other point-goal navigation tests</p>
</p>

#### More Results
To demonstrate the effects of concerning the impact of measurement noise, varying view angles, and limited observations on mapping, we have conducted a series of supplementary experiments using the MaiCity dataset sequence 01, as compared with baseline methods.
<p align="center">
  <img src="/assets/img/2024_tase_mapping/2024_tase_comp_table.png" width="70%" />
</p>

### Citation

TBD
