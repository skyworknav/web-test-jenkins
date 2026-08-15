pipeline {
    agent any

    environment {
        REGISTRY = '192.168.56.30:5000'
        IMAGE = 'static-site'
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBECONFIG = '/etc/jenkins/kubeconfig'
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

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl --kubeconfig=${KUBECONFIG} \
                      set image deployment/static-site \
                      static-site=${REGISTRY}/${IMAGE}:${IMAGE_TAG} \
                      -n default

                    kubectl --kubeconfig=${KUBECONFIG} \
                      rollout status deployment/static-site \
                      -n default \
                      --timeout=120s
                '''
            }
        }

    }
}