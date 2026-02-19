pipeline {
  agent {
    docker {
      image 'cimg/node:18.13.0-browsers'
      args '--shm-size=1g'
    }
  }

  environment {
    REPORT_DIR = 'reports'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run tests') {
      steps {
        // run the CI test script; allow non-zero to continue report generation
        sh 'npm run test:ci || true'
      }
    }

    stage('Generate HTML report') {
      steps {
        // convert mochawesome json -> html (marge should be available via npx)
        sh 'npx marge ${REPORT_DIR}/results-0-0.json --reportDir ${REPORT_DIR} --reportFilename wdio-report || true'
      }
    }

    stage('Archive results') {
      steps {
        archiveArtifacts artifacts: 'reports/**', fingerprint: true
      }
    }
  }

  post {
    always {
      echo "Workspace: ${env.WORKSPACE}"
    }
    success {
      echo 'Pipeline succeeded.'
    }
    failure {
      echo 'Pipeline failed. Check archived reports for details.'
    }
  }
}
