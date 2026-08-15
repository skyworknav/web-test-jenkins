pipeline {
    agent any

    environment {
        REGISTRY = '192.168.56.30:5000'
        IMAGE_NAME = 'static-site'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Image') {
            steps {
                sh '''
                    docker build \
                      -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} \
                      .
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                    docker push \
                      ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }
    }
}