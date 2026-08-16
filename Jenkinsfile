```groovy
pipeline {
    agent any

    environment {
        REGISTRY = '192.168.56.30:5000'
        IMAGE = 'static-site'
        IMAGE_TAG = "${BUILD_NUMBER}"
        GIT_CREDENTIALS = 'github-pat'
    }

    stages {

        stage('Build Image') {
            steps {
                sh '''
                    docker build \
                      -t ${REGISTRY}/${IMAGE}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                    docker push \
                      ${REGISTRY}/${IMAGE}:${IMAGE_TAG}
                '''
            }
        }

        stage('Update GitOps Manifest') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${GIT_CREDENTIALS}",
                        usernameVariable: 'GIT_USERNAME',
                        passwordVariable: 'GIT_PASSWORD'
                    )
                ]) {
                    sh '''
                        git config user.name "Jenkins"
                        git config user.email "jenkins@localhost"

                        git fetch origin main
                        git checkout main
                        git reset --hard origin/main

                        sed -i "s#image: ${REGISTRY}/${IMAGE}:[0-9]*#image: ${REGISTRY}/${IMAGE}:${IMAGE_TAG}#" k8s/deployment.yaml

                        git add k8s/deployment.yaml

                        git commit -m "Update static-site image to ${IMAGE_TAG}" || true

                        git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/skyworknav/web-test-jenkins.git HEAD:main
                    '''
                }
            }
        }

    }
}
```
