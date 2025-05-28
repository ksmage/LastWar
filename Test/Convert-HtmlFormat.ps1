param($name="result",$source = "C:\Users\archmage\OneDrive - 株式会社ｉＤＩＣサービス\趣味\ラストウォー\シーズン２\ScriptTest.html",
    $dataValueList = @(2,3,4,6,7,8,9,10))

$sourceFolder = Split-Path -Path $source -Parent

$htmlFileName = $name + ".html"
$htmlFilePath = Join-Path $sourceFolder $htmlFileName

$sourceData = Get-Content -Path $source -Encoding UTF8



$index = 0
$trCount = 0
$rcount = 0
foreach($line in $sourceData){
    if ($line -match '.*<tr ?.*>'){
        $count = 1
        $trCount++
        $index++
        continue
    }

    
    if ($line -match '(.*<td class=")(".*?)(>.*</td>)'){
        if($trCount -eq 1){
            $sourceData[$index] = $matches[1] + "c" + ("{0:00}" -f $count) + " head""" + $matches[3]
        }else{
            if ($count -in $dataValueList){
                if ($rcount -eq 5){
                    $rcount = 0
                }
                $line -match '(.*<td class=")(".*?)(>)(.*)(</td>)' > $null
                if ($matches[4].ToLower() -eq "true"){
                    $rcount++
                    $sourceData[$index] = $matches[1] + "c" + ("{0:00}" -f $count) + " tableCell data""" + $matches[3] + "<input class=""" + "no" + ("{0:00}" -f $rcount) + """ type=""checkbox"" checked>" + $matches[5]
                }elseif($matches[4].ToLower() -eq "false"){
                    $rcount++
                    $sourceData[$index] = $matches[1] + "c" + ("{0:00}" -f $count) + " tableCell data""" + $matches[3] + "<input class=""" + "no" + ("{0:00}" -f $rcount) + """ type=""checkbox"" >" + $matches[5]
                }else{
                    $sourceData[$index] = $matches[1] + "c" + ("{0:00}" -f $count) + " tableCell data"" data-type=""numeric"" data-target="""" data-value=""" + $matches[4] + """" + $matches[3] + $matches[5]
                }
            }else{
                $sourceData[$index] = $matches[1] + "c" + ("{0:00}" -f $count) + " tableCell""" + $matches[3]
            }
        }
        $count++
    }

    $index++
}

$sourceData