 #!/bin/bash
echo "Welcome"
workingDir=$1
buildDirName=$2
deployDirName=$3
backupDirName=$4
isBackup=$5
maxBackupVersion=$6
versionFileName=$7
cd $workingDir
ls
if [ "$isBackup" = "true" ]
then
    if [ -d "$workingDir/$deployDirName" ]
    then
        echo "Backup old deploy!!!"
        if ! [ -d "$workingDir/$backupDirName" ]
        then
            echo "Create backup folder!!!"
            mkdir "$workingDir/$backupDirName"
        fi
        backupFileName=`date +%Y-%m-%d.%H:%M:%S`
        if [ -f "$deployDirName/$versionFileName" ]
        then
            tmpVersion=`cat $deployDirName/$versionFileName`
            if ! ["" = "$tmpVersion"]
            then
            backupFileName=$tmpVersion
            fi
        fi
        zip -r "$workingDir/$backupDirName/$backupFileName.zip" $deployDirName
        cd "$backupDirName"
        ls -t | tail -n +"$((maxBackupVersion + 1))" | xargs rm -rfv
        cd ../
    else
        echo "No older deploy for backup!!!"
    fi
else
echo "Backup config not true!!!"
fi
rm -rf $deployDirName
mv $buildDirName $deployDirName
echo "Done!!!"