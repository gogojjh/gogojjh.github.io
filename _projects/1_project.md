---
layout: page
title: Multi-LiDAR Perception System
description: 
img: assets/img/12.jpg
importance: 1
category: Research
period: xxx
---

My Ph.D. thesis can be found <a href="xxx">here</a>.

<h2>Motivation</h2>

My Ph.D. period mostly focuesd on the multi-LiDAR perception problem. 
<!-- LiDARs are robust and provide valuable information for navigation.  -->
At the begining of my Ph.D., I joined in a autonomous golf cart project. Our team achieved many functions, including the SLAM and obstacle detection using only one LiDAR (see Fig.xx).
However, the limitations of a single LiDAR is also obvious: LiDAR commonly severs from data sparsity, limited FOV, and occlusion.
This setting cannot provide sufficient perception awareness for a vehicle, where an example is shown in Fig.xxx
Compared with a single-LiDAR setup, the primary improvement of a multi-LiDAR system is the signi cant enhancement of the sensing range and density of measurements. 
However, the multi-LiDAR perception is still an open problem, and few articles discuss it. Therefore, I focused on SLAM and object detection, two important tasks in LiDAR perception. 
The extrinsic calibration of multiple LiDARs is also concerned.

<h2>Problem Statement</h2>
 
<h4>Problem Formulation for the Single-LiDAR Case</h4>
Denoting $$ \mathcal{X} $$ the unknown variable to be estimated given data $$ \mathcal{Z} $$. 
From the optimization perspective, the optimal $$ \mathcal{X} $$ is estimated by minimizing the **objective function**: 

$$\hat{\mathcal{X}} = \arg\min_{\mathcal{X}}f(\mathcal{X},\mathcal{Z})$$

<h5>SLAM</h5>
In LiDAR-based SLAM, the variable $$\mathcal{X}$$ typically indicates the robot's poses and $$\mathcal{Z}=\{\mathbf{z}_{k}\}$$ represents LiDARs' feature points. 
Each measurement can be expressed as a function of $$\mathcal{X}$$, i.e.,
$$\mathbf{z}_{k}=h_{k}(\mathcal{X}) + \epsilon_{k}$$, where $$h_{k}(\cdot)$$ is the observation model and $$\epsilon_{k}$$ is the measurement noise. SLAM is commonly formulated as a MAP estimation problem []. Assume that the noise $$\epsilon_{k}\sim \mathcal{N}(\mathbf{0}, \Sigma_{k})$$, the objective is defined as

$$f(\mathcal{X},\mathcal{Z})\triangleq\sum_{\mathbf{z}_{k}\in\mathcal{Z}}||h_{k}(\mathcal{X}) - \mathbf{z}_{k}||^{2}_{\Sigma_{k}}$$

<h5>Object Detection</h5>
In LiDAR-based object detection tasks, the output is a set of objects' bounding boxes $$\mathcal{B}$$. Each box $$\mathbf{b}$$ is parameterized as $$[cls, x, y, z, l,, w, h, \gamma]$$, 
where $$cls$$ is the class of a bounding box, $$[x,y,z]$$ denotes a box's bottom center,
$$[l,w,h]$$ represent the sizes along the $$x-$$, $$y-$$, and $$z-$$ axes respectively,
as well as $$\gamma$$ for the rotation of the 3D bounding box along the $$z-$$ axis.
Object detection is a typical pattern recognition problem, which can be solved by \textit{supervised learning} algorithms.
To make the notation compatible with the computer vision community, I substitute $$\mathcal{X}$$ and $$\mathcal{Z}$$ with $$\theta$$ and $$\mathcal{D}$$ respectively.

In learing-based methods, \textit{training} and \textit{inference} are two essential stages.
The training process is to teach a model $$G_{\theta}(\cdot)$$ to learn from the \textit{training set} $$\mathcal{D}_{train}$$.
This is done by minimizing the objective function $$f(\theta,\mathcal{Z}_{train})$$, where $$\theta$$ is the model parameter.
After getting the parameter $$\hat{\theta}$$ that best fits the training set, the model can make predictions of data from the \textit{testing set} $$\mathcal{D}_{test}$$,
i.e., $$\mathcal{B}_{pred}=G_{\hat{\theta}}(\mathcal{D}_{test})$$.
Note that $$\mathcal{D}_{train}$$ contains labeled (or called ground-truth) boxes with corresponding object point clouds, while $$\mathcal{D}_{test}$$ only consists of raw point clouds.
