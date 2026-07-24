pipeline {
    agent any

    stages {
        stage('Build Image') {
            steps {
                sh 'docker build -t static-site:v1 .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f website || true
                    docker run -d --name website -p 8082:80 static-site:v1
                '''
            }
        }
    }
}