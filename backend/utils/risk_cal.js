function get_risk_rate(a, i, e, d) { //a-age (min_age-max_age) i-incom e-expensec d-dependence
    const max_age = 70;
    const min_age = 18;
    const max_depent = 10;

    //weights
    afw = 0.4;
    ifw = 0.4;
    dfw = 0.2;

    age_factor = (max_age-a) / (max_age-min_age);

    if(i>0){
        income_factor = (i - e) / i;
    }else{
    income_factor = 0;
    }

    dependents_factor = (max_depent - d) / max_depent;

    risk_score = (age_factor * afw) + (income_factor * ifw) + (dependents_factor * dfw);
    risk_rating = 1 + ( 9 * risk_score);

    return risk_rating;
    
}

module.exports = { get_risk_rate };