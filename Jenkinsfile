pipeline {
agent any

```
tools {
    jdk 'JDK17'
    maven 'Maven'
}

stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
            url: 'https://github.com/Ganga-balaguru16/leave-management.git'
        }
    }

    stage('Build') {
        steps {
            bat 'mvn clean compile'
        }
    }

    stage('Test') {
        steps {
            bat 'mvn test'
        }
    }

    stage('Package') {
        steps {
            bat 'mvn clean package -DskipTests'
        }
    }

    stage('Deploy') {
        steps {
            bat 'echo Deploying Leave Management System...'
        }
    }

    stage('Release') {
        steps {
            archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
        }
    }
}

post {
    success {
        echo 'Pipeline executed successfully!'
    }

    failure {
        echo 'Pipeline failed!'
    }
}
```

}
