        $("input:checkbox").on('click', function() {
            var $box = $(this);
            if ($box.is(":checked")) {
                var group = "input:checkbox[name='" + $box.attr("name") + "']";
                $(group).prop("checked", false);
                $box.prop("checked", true);
            } else {
                $box.prop("checked", false);
            }
        });

        var today = new Date();
        today.setDate(today.getDate() - 1);
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var today = mm + '/' + dd + '/' + yyyy;
        document.getElementById("startDate").value = today;

        var select = function(dateStr) {
            $("#startDate").datepicker('getDate');
        }

        $(document).ready(function() {
            $("#calculate").click(function() {
                var d1 = $("#startDate").datepicker('getDate');
                var d2 = new Date();
                var diff = 0;
                if (d1 && d2) {
                    diff = Math.floor((d2.getTime() - d1.getTime()) / 86400000);
                }

                var totalMilesPerYear = 0;
                if (document.getElementById("c1").checked) {
                    totalMilesPerYear = 10000;
                } else if (document.getElementById("c2").checked) {
                    totalMilesPerYear = 12000;
                } else if (document.getElementById("c3").checked) {
                    totalMilesPerYear = 15000;
                } else {
                    totalMilesPerYear = 0;
                }

                var totalYears = 0;
                if (document.getElementById("c4").checked) {
                    totalYears = 1;
                } else if (document.getElementById("c5").checked) {
                    totalYears = 2;
                } else if (document.getElementById("c6").checked) {
                    totalYears = 3;
                } else {
                    totalYears = 0;
                }

                var currentMileage = 0;
                if ($("#CurrentMileage").val()) {
                    currentMileage = document.getElementById("CurrentMileage").value;
                }

                var extraMiles = 0;
                if ($("#ExtraMiles").val()) {
                    extraMiles = document.getElementById("ExtraMiles").value;
                }

                var initialMileage = 0;
                if ($("#InitialMileage").val()) {
                    initialMileage = document.getElementById("InitialMileage").value;
                }

                var allowedMilesPerDay = ((totalMilesPerYear * totalYears) + (extraMiles - initialMileage)) / (totalYears * 365.0);
                $('#AllowedMilesPerDay').val(allowedMilesPerDay);

                var remainingMileage = ((totalMilesPerYear * totalYears) + (extraMiles - initialMileage)) - currentMileage;
                $('#RemainingMileage').val(remainingMileage);

                var savedMileage = (allowedMilesPerDay * diff) - currentMileage;
                $('#SavedMileage').val(savedMileage);

                var averageMilesPerDay = (currentMileage - initialMileage) / diff;
                if (averageMilesPerDay <= 0) {
                    averageMilesPerDay = 0;
                }
                $('#AverageMilesPerDay').val(averageMilesPerDay);

                var totalMilesOnAverage = averageMilesPerDay * ((totalYears * 365) - diff);
                if (totalMilesOnAverage <= 0) {
                    totalMilesOnAverage = 0;
                }
                $('#TotalMilesOnAverage').val(totalMilesOnAverage);
            });
            $("#startDate").datepicker({
                onSelect: select
            });
        });