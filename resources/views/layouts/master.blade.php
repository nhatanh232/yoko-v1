<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>
        @if (isset($title))
            Quản lý {{ucfirst($title)}} - YOKO
        @else
            @yield('title', 'Admin'){{' :: '.config('app.name')}}
        @endif
    </title>
    <!--STYLESHEET-->
    <!--Open Sans Font [ OPTIONAL ]-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
    <!--Bootstrap Stylesheet [ REQUIRED ]-->
    <link href="/nifty/css/bootstrap.min.css?v=1" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/nifty/plugins/font-awesome/css/font-awesome.min.css?v=1">
    <!--Nifty Stylesheet [ REQUIRED ]-->
    <link href="/nifty/css/nifty.min.css" rel="stylesheet">
    <!--Nifty Premium Icon [ DEMONSTRATION ]-->
    <link href="/nifty/css/demo/nifty-demo-icons.min.css" rel="stylesheet">
    <link href="/nifty/css/demo/premium-icon-screenshot.css" rel="stylesheet">
    <!--JAVASCRIPT-->
    <!--Select2 [ OPTIONAL ]-->
    <link href="/nifty/plugins/select2/css/select2.min.css" rel="stylesheet">

{{--<link href="{{ asset('vendor/select2/select2.css') }}" rel="stylesheet" type="text/css" />--}}
{{--<link href="{{ asset('vendor/select2/select2-bootstrap-dick.css') }}" rel="stylesheet" type="text/css" />--}}

<!-- pnotify -->
    <link rel="stylesheet" href="{{ asset('/assets/plugins/pnotify/pnotify.custom.min.css') }}">
    <!--Switchery [ OPTIONAL ]-->
    <link href="/nifty/plugins/switchery/switchery.min.css" rel="stylesheet">
    <!-- bootstrap datepicker -->
    <link rel="stylesheet" href="{{ asset('/nifty/plugins/bootstrap-datepicker/bootstrap-datepicker.min.css') }}">

    <link href="{{ asset('/nifty/plugins/bootstrap-select/bootstrap-select.min.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.css" integrity="sha512-63+XcK3ZAZFBhAVZ4irKWe9eorFG0qYsy2CaM5Z+F3kUn76ukznN0cp4SArgItSbDFD1RrrWgVMBY9C/2ZoURA==" crossorigin="anonymous" />
    <!--Pace - Page Load Progress Par [OPTIONAL]-->
    <link href="/nifty/plugins/pace/pace.min.css" rel="stylesheet">

    <!--Morris.js [ OPTIONAL ]-->
    <link href="/nifty/plugins/morris-js/morris.min.css" rel="stylesheet">

    @yield('before_styles')

    <link rel="shortcut icon" href="/images/favicon.png"/>
    <style>
        .error{
            color: red;
        }
    </style>

@yield('after_styles')

<!-- Favicons -->
    <link rel="#" type="image/x-icon" sizes="16x16">

    <script type="text/javascript">
        var _base_url = '{{url('/')}}';
        var _is_login = '{{\Auth::check() ? 'true' : 'false'}}';
    </script>
</head>
<!--TIPS-->
<!--You may remove all ID or Class names which contain "demo-", they are only used for demonstration. -->
<body>
<div id="fadeLoading">
    <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
<div id="container" class="effect aside-float aside-bright mainnav-lg navbar-fixed">

    @include('includes.header')

    <div class="boxed">

        <!--CONTENT CONTAINER-->
        <!--===================================================-->
        <div id="content-container">
            <!--Page Title-->
            <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
            <div id="page-title">
                <h1 class="page-header text-overflow">{{ @$title }}</h1>
            </div>
            <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
            <!--End page title-->

            <!--Page content-->
        @yield('content')
        <!--End page content-->
        </div>
        <!--===================================================-->
        <!--END CONTENT CONTAINER-->

        @include('includes.sidebar')

    </div>

    <!-- FOOTER -->
    <!--===================================================-->
    <footer id="footer">

        <!-- Visible when footer positions are fixed -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <div class="show-fixed pull-right">
            You have <a href="#" class="text-bold text-main"><span class="label label-danger">3</span> pending action.</a>
        </div>

        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <!-- Remove the class "show-fixed" and "hide-fixed" to make the content always appears. -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

        <p class="pad-lft">&#0169; CÔNG TY TNHH QUẢNG CÁO BAO BÌ YOKO</p>



    </footer>
    <!--===================================================-->
    <!-- END FOOTER -->


    <!-- SCROLL PAGE BUTTON -->
    <!--===================================================-->
    <button class="scroll-top btn">
        <i class="pci-chevron chevron-up"></i>
    </button>
    <!--===================================================-->



</div>
<!--===================================================-->
<!-- END OF CONTAINER -->

<!--jQuery [ REQUIRED ]-->
<script src="/nifty/js/jquery.min.js"></script>
<!--BootstrapJS [ RECOMMENDED ]-->
<script src="/nifty/js/bootstrap.min.js"></script>
<script src="{{ asset('/assets/plugins/moment/min/moment-with-locales.min.js') }}"></script>
<!--NiftyJS [ RECOMMENDED ]-->
<script src="/nifty/js/nifty.min.js"></script>
<script src="/nifty/plugins/pace/pace.min.js"></script>
<!--Select2 [ OPTIONAL ]-->
<script src="/nifty/plugins/select2/js/select2.min.js"></script>

{{--<script src="{{ asset('vendor/select2/select2.js') }}"></script>--}}

<!-- pnotify -->
<script src="{{ asset('/assets/plugins/pnotify/pnotify.custom.min.js') }}"></script>
<!--Switchery [ OPTIONAL ]-->
<script src="/nifty/plugins/switchery/switchery.min.js"></script>
<!-- bootstrap datepicker -->
<script src="{{ asset('/nifty/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js') }}"></script>
<script src="{{ asset('/nifty/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.vi.min.js') }}"></script>
<script src="{{ asset('/nifty/plugins/bootstrap-select/bootstrap-select.min.js') }}"></script>
<script src="/js/jquery.validate.min.js"></script>
<!--Morris.js [ OPTIONAL ]-->
<script src="/nifty/plugins/morris-js/morris.min.js"></script>
<script src="/nifty/plugins/morris-js/raphael-js/raphael.min.js"></script>
<script src="/js/constants.js"></script>
<script src="/js/function.js"></script>
<script type="text/javascript" src="/js/laroute.js"></script>

<!-- page script -->
<script type="text/javascript">
    // Ajax calls should always have the CSRF token attached to them, otherwise they won't work
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $(document).bind("ajaxSend", function(){
        $('#fadeLoading').show();
    }).bind("ajaxComplete", function(){
        $('#fadeLoading').hide();
    }).bind("ajaxError",  function() {
        $('#fadeLoading').hide();
    });
</script>

@yield('after_scripts')
</body>
</html>
