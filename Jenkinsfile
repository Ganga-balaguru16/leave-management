pipeline {
agent any


stages {

    stage('Checkout') {
        steps {
            echo 'Source code checked out'
        }
    }

    stage('Build & Package') {
        steps {
            dir('backend') {
                bat 'mvn clean package -DskipTests'
            }
        }
    }

    stage('Deploy') {
        steps {
            echo 'Deploying application...'
        }
    }

    stage('Release') {
        steps {
            archiveArtifacts artifacts: 'backend/target/*.jar'
        }
    }
}


}
