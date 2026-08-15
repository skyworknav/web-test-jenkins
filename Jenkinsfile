pipeline {
    agent any

    environment {
        REGISTRY = '192.168.56.30:5000'
        IMAGE = 'static-site'
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Image') {
            steps {
                sh '''
                    docker build -t ${REGISTRY}/${IMAGE}:${TAG} .
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                    docker push ${REGISTRY}/${IMAGE}:${TAG}
                '''
            }
        }
    }
}